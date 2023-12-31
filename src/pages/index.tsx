import { Inter } from "next/font/google";
import { useAccounts } from "../hooks/accounts";
import AccountCard from "@/components/AccountCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [category, setCategory] = useState("regular");
  const { data: accounts, isLoading } = useAccounts(category, "");

  return (
    <main
      className={`flex min-h-screen max-w-screen bg-background flex-col gap-[15px] p-[10px] items-center px-5 ${inter.className}`}
    >
      <h1 className="text-md">Accounts Leaderboard</h1>
      <div className="transition flex flex-col w-full gap-[10px]">
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
