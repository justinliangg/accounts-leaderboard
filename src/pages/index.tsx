import { Inter } from "next/font/google";
import { useAccounts, useCategories } from "../hooks/accounts";
import AccountCard from "@/components/account/AccountCard";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { ChangeEvent, useState, useEffect } from "react";
import Searchbar from "@/components/common/Searchbar";
import { useDebounce } from "use-debounce";
import CategoriesDropdown from "@/components/account/CategoriesDropdown";

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
        className="w-[70%]"
      />
      <Searchbar onChange={onSearch} className="w-full" />
      <div className="transition flex flex-col w-full gap-[10px] ">
        {!isLoading ? (
          accounts?.map((a) => {
            return <AccountCard key={a.ranking} accountDetails={a} />;
          })
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </main>
  );
}
