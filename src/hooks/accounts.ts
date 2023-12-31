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
    const params = new URLSearchParams({
      category,
      searchQuery
    });
    const res = await apiClient.get(`/accounts?${params.toString()}`);

    // Not sure why axios does not convert to JSON.
    return JSON.parse(res.data);
  };

  return useQuery({
    queryKey: ["accounts", category, searchQuery],
    queryFn: queryFn,
    enabled: !!category
  });
};

export const useCategories = () => {
  const queryFn = async (): Promise<string[]> => {
    const res = await apiClient.get(`/accounts/categories`);

    // Not sure why axios does not convert to JSON.
    return JSON.parse(res.data);
  };

  return useQuery({
    queryKey: ["categories"],
    queryFn: queryFn
  });
};
