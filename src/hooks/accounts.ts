import apiClient from "../lib/api-client";
import { useQuery } from "@tanstack/react-query";

interface AccountResponse {
  ranking: number;
  bankImage: string;
  bankingProduct: string;
  validFrom: string;
  base: string;
  maxBonus: string;
  maxTotal: string;
  requirementForBonus: string;
  maxBalance: string;
  comments: string;
  effectiveAsOf: string;
  lastCheckedOrEdited: string;
  link: string;
}

export const useAccounts = (category: string, searchQuery: string) => {
  const queryFn = async (): Promise<AccountResponse[]> => {
    const res = await apiClient.get(`/accounts?category=${category}`);

    // Not sure why axios does not convert to JSON.
    return JSON.parse(res.data);
  };

  return useQuery({
    queryKey: ["accounts", category, searchQuery],
    queryFn: queryFn
  });
};