import axios from "axios";
import cache from "../src/lib/cache";

const sheetsAPIKey = process.env.SHEETS_API_KEY;

type AccountsData = Record<string, Record<string, string | number>>;

/**
 * Retrieves data from the Savings sheet in Accounts Leaderboard google spreadsheet.
 */
const getData = async () => {
  // grabbing from cache first.
  const existingData = cache.get<AccountsData>("accountsData");
  if (existingData) {
    return existingData;
  }

  // getTitle() is required as the title will change periodically as the version
  // increases, therefore getting it dynamically is required.
  const savingsSheetTitle = await getTitle();
  const baseUrl = `https://sheets.googleapis.com/v4/spreadsheets/145iM6uuFS9m-Rul65--eFJQq_Au7Z_BA4_CwkYwu2DI/values/${savingsSheetTitle}`;

  const accountsData: string[][] = (await axios.get(`${baseUrl}!A:Z?key=${sheetsAPIKey}`)).data
    .values;

  // valueRenderOption param is required to retrieve the URL of the images for display
  const bankImages: string[] = (
    await axios.get(`${baseUrl}!A2:A?valueRenderOption=FORMULA&key=${sheetsAPIKey}`)
  ).data.values;

  const processedData = processSavingsData(bankImages, accountsData);

  cache.set("accountsData", processedData, 86400); // set for 1 day.

  return processedData;
};

/**
 * Function to get the current title for Saving accounts.
 * @returns saving sheet title
 */
const getTitle = async (): Promise<string> => {
  const sheets = (
    await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/145iM6uuFS9m-Rul65--eFJQq_Au7Z_BA4_CwkYwu2DI?fields=sheets(properties(sheetId%2Ctitle))&key=${sheetsAPIKey}`
    )
  ).data.sheets;

  const savingsSheet = sheets.find((sheet: any) => sheet.properties.sheetId === 271791020);

  return savingsSheet.properties.title;
};

const processSavingsData = (images: string[], data: string[][]) => {
  const fields = data[0].map((d) => d.replace(/\n/g, " "));
  fields.splice(1, 1); // removing an empty field

  // remove after retrieving the fields
  data.splice(0, 1);
  const categories = buildCategories(data);

  const processedData: Record<string, Record<string, string | number>[]> = {};
  let currCategory = categories[0];
  let nextCategory = categories[1];
  for (let i = 0; i < categories.length - 1; i++) {
    let ranking = 1;
    currCategory = categories[i];
    nextCategory = categories[i + 1];

    // Adding the relevant account in each categorie.
    const accounts = [];
    for (let j = currCategory.startIndex; j < nextCategory.startIndex - 1; j++) {
      const account = data[j];

      // grabbing the only the URL which is "".
      const match = images[j][0].match(/"([^"]+)"/);
      const bankImage = match && match[1] ? match[1] : "";

      // building the account info with the fieldName and the respective data.
      const accountInfo: Record<string, string | number> = {
        ranking,
        bankImage
      };
      for (let k = 1; k < account.length; k++) {
        const fieldName = camalize(fields[k - 1]);
        const fieldData = account[k];

        accountInfo[`${fieldName}`] = fieldData;
      }

      accounts.push(accountInfo);
      ranking += 1;
    }
    processedData[camalize(currCategory.name)] = accounts;
  }

  // Flushing the last category out
  // TODO: Remove this duplication
  const accounts = [];
  let ranking = 1;
  for (let j = nextCategory.startIndex; j < data.length; j++) {
    const product = data[j];

    // grabbing the only the URL which is "".
    const match = images[j][0].match(/"([^"]+)"/);
    const bankImage = match && match[1] ? match[1] : "";

    const productInfo: Record<string, string | number> = { ranking, bankImage };
    for (let k = 1; k < product.length; k++) {
      const fieldName = camalize(fields[k - 1]);
      const fieldData = product[k];

      productInfo[`${fieldName}`] = fieldData;
    }

    accounts.push(productInfo);
    ranking += 1;
  }
  processedData[camalize(nextCategory.name)] = accounts;

  return processedData;
};

const buildCategories = (data: string[][]) => {
  const categories: { name: string; startIndex: number }[] = [];

  categories.push({
    name: "Regular",
    startIndex: 0
  });

  data.forEach((d, index) => {
    if (d[0] === "") {
      return;
    }

    categories.push({
      name: d[0],
      startIndex: index + 1
    });
  });

  return categories;
};

const camalize = (str: string) => {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
};

const savingsSheet = {
  getData
};

export default savingsSheet;
