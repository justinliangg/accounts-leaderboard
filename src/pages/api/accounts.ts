// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import savingsSheetsService from "../../../services/savings-sheet";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category, searchQuery } = req.query;

  // Could possibly use zod.
  if (typeof category !== "string") {
    res.status(400).end();
  }

  const data = await savingsSheetsService.getData();

  const categoryData = data[category as string];

  res.status(200).json(categoryData);
}
