// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import savingsSheetsService from "../../../services/savings-sheet";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category, searchQuery } = req.query;

  // Could possibly use zod.
  if (typeof category !== "string") {
    return res.status(400).end();
  }

  if (typeof searchQuery !== "string") {
    return res.status(400).end();
  }

  const accounts = await savingsSheetsService.getData();

  const categoryAccounts = accounts[category];

  // performing "Search"
  const filteredAccounts: Record<string, string>[] = [];
  categoryAccounts.forEach((cA) => {
    const query = searchQuery.toLowerCase();
    const matched =
      cA.maxTotal.toLowerCase().includes(query) || cA.bankingProduct.toLowerCase().includes(query);
    if (matched) {
      filteredAccounts.push(cA);
    }
  });

  res.status(200).json(filteredAccounts);
}
