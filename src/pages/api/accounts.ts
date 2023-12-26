// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import savingsSheetsService from "../../../services/savings-sheet";

// const sheetsAPIKey = process.env.SHEETS_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category } = req.query;

  const data = await savingsSheetsService.getData();

  // const url = `https://sheets.googleapis.com/v4/spreadsheets/145iM6uuFS9m-Rul65--eFJQq_Au7Z_BA4_CwkYwu2DI/values/${savingsSheetTitle}!A2:A66?valueRenderOption=FORMULA&key=${sheetsAPIKey}`;
  // const data = (await axios.get(url)).data;

  res.status(200).json(data);
}
