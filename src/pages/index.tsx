import { Inter } from "next/font/google";
import { useAccounts, useCategories } from "../hooks/accounts";
import AccountCard from "@/components/account/AccountCard";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useState, useEffect } from "react";
import Searchbar from "@/components/common/Searchbar";
import { useDebounce } from "use-debounce";
import CategoriesDropdown from "@/components/account/CategoriesDropdown";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: categories } = useCategories();
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery] = useDebounce(searchValue, 1000);
  const [category, setCategory] = useState("");

  const router = useRouter();

  const { data: accounts, isLoading } = useAccounts(category, searchQuery);

  useEffect(() => {
    setCategory(categories ? categories[0] : "");
  }, [categories]);

  const onCategoryChange = (category: string) => {
    setCategory(category);

    router.push({
      pathname: router.pathname,
      query: { ...router.query, category: category }
    });
  };

  const onSearch = (value: string) => {
    setSearchValue(value);

    router.push({
      pathname: router.pathname,
      query: { ...router.query, searchQuery: value }
    });
  };

  useEffect(() => {
    // Retrieve values from URL or use default values
    const savedCategory = router.query.category || "";
    const savedQuery = router.query.searchQuery || "";

    setCategory(savedCategory as string);
    setSearchValue(savedQuery as string);
  }, [router.query]);

  return (
    <main className={`flex flex-col gap-[15px] items-center w-full md:w-[80%] ${inter.className}`}>
      <h1 className="text-md">Accounts Leaderboard</h1>
      <CategoriesDropdown
        selectedCategory={category}
        handleChange={onCategoryChange}
        className="w-[70%]"
      />
      <Searchbar searchValue={searchValue} onChange={onSearch} className="w-full" />
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
