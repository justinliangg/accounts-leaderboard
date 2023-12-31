import { Inter } from "next/font/google";
import { useAccounts, useCategories } from "../hooks/accounts";
import AccountCard from "@/components/AccountCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ChangeEvent, useState, useEffect } from "react";
import Searchbar from "@/components/Searchbar";
import { useDebounce } from "use-debounce";
import CategoriesDropdown from "@/components/CategoriesDropdown";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: categories } = useCategories();
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery] = useDebounce(searchValue, 1000);
  const [category, setCategory] = useState("");

  const { data: accounts, isLoading } = useAccounts(category, searchQuery);

  useEffect(() => {
    setCategory(categories ? categories[0] : "");
  }, [categories]);

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <main className={`flex flex-col gap-[15px] items-center w-full md:w-[80%] ${inter.className}`}>
      <h1 className="text-md">Accounts Leaderboard</h1>
      <CategoriesDropdown
        selectedCategory={category}
        handleChange={(category: string) => setCategory(category)}
        className="w-[70%] h-[40px]"
      />
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
