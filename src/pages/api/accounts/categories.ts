// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import savingsSheetService from "@/services/savings-sheet";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const accounts = await savingsSheetService.getData();

  const categories = Object.keys(accounts);

  res.status(200).json(categories);
}
