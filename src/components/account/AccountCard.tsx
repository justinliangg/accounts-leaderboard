/* eslint-disable @next/next/no-img-element */
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useState } from "react";
import AccountSidePane from "@/components/account/AccountSidepane";
import { AccountResponse } from "@/types";

interface AccountCardProps {
  accountDetails: AccountResponse;
}

const AccountCard = ({ accountDetails }: AccountCardProps) => {
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <motion.li
      animate={{
        height: "auto",
        opacity: 1,
        transition: { type: "spring", bounce: 0.3, opacity: { delay: 0.1 } }
      }}
      initial={{ height: 0, opacity: 0 }}
      className="flex flex-col gap-[10px] w-full"
    >
      <div
        onClick={() => setPanelOpen(true)}
        className="bg-secondary flex flex-row p-3 h-[60px] items-center w-full rounded-[10px] justify-between"
      >
        <div className="flex flex-row gap-[10px] items-center">
          <div>
            <p className="min-w-6 max-w-10 text-center">{`${accountDetails.ranking}`}</p>
          </div>

          <img
            className="h-[40px] w-[40px]"
            src={accountDetails.bankImage}
            alt={`${accountDetails.bankingProduct} image`}
          />
          <div className="flex flex-col">
            <p className="text-sm line-clamp-1">{accountDetails.bankingProduct}</p>
            <p className="text-sm font-bold">{accountDetails.maxTotal}</p>
          </div>
        </div>
        <div>
          <ChevronRightIcon className="h-5 w-5" />
        </div>
      </div>
      <AccountSidePane
        accountDetails={accountDetails}
        panelOpen={panelOpen}
        setPanelOpen={setPanelOpen}
      />
    </motion.li>
  );
};

export default AccountCard;
