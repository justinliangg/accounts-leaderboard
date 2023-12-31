import { Inter } from "next/font/google";
import { useAccounts } from "../hooks/accounts";
import AccountCard from "@/components/AccountCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ChangeEvent, useState, useEffect } from "react";
import Searchbar from "@/components/Searchbar";
import { useDebounce } from "use-debounce";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [category, setCategory] = useState("regular");
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery] = useDebounce(searchValue, 1000);
  const { data: accounts, isLoading } = useAccounts(category, searchQuery);

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <main className={`flex flex-col gap-[15px] items-center md:w-[80%] ${inter.className}`}>
      <h1 className="text-md">Accounts Leaderboard</h1>
      <Searchbar onChange={onSearch} className="w-full h-[40px]" />
      <div className="transition flex flex-col w-full gap-[10px] ">
        {!isLoading ? (
          accounts?.map((a) => {
            return (
              <AccountCard
                key={a.ranking}
                name={a.bankingProduct}
                imageUrl={a.bankImage}
                ranking={a.ranking}
                interestRate={a.maxTotal}
              />
            );
          })
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </main>
  );
}
