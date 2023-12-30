import { Inter } from "next/font/google";
import { useAccounts } from "../hooks/accounts";
import AccountCard from "@/components/AccountCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { motion } from "framer-motion";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: accounts, isLoading } = useAccounts("regular", "");

  console.log(isLoading);

  console.log(typeof accounts);
  return (
    <main
      className={`flex min-h-screen max-w-screen bg-background flex-col gap-[15px] p-[10px] items-center px-5 ${inter.className}`}
    >
      <h1 className="text-md">Accounts Leaderboard</h1>

      {!isLoading ? (
        <motion.div
          animate={{ y: 0 }}
          initial={{ y: 200 }}
          className="flex flex-col gap-[10px] w-full"
        >
          {accounts?.map((a) => {
            return (
              <AccountCard
                key={a.ranking}
                name={a.bankingProduct}
                imageUrl={a.bankImage}
                ranking={a.ranking}
                interestRate={a.maxTotal}
              />
            );
          })}
        </motion.div>
      ) : (
        <LoadingSpinner />
      )}
    </main>
  );
}
