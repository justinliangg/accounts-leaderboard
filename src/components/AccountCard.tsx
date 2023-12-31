/* eslint-disable @next/next/no-img-element */
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

interface AccountCardProps {
  ranking: number;
  imageUrl: string;
  name: string;
  interestRate: string;
}

const AccountCard = ({ imageUrl, name, interestRate, ranking }: AccountCardProps) => {
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
      <div className="bg-secondary flex flex-row p-3 h-[60px] items-center w-full rounded-[10px] justify-between">
        <div className="flex flex-row gap-[10px] items-center">
          <p>{ranking}</p>
          <img className="object-cover h-[40px] w-[40px]" src={imageUrl} alt={`${name} image`} />
          <div className="flex flex-col">
            <p className="text-sm line-clamp-1">{name}</p>
            <p className="text-sm font-bold">{interestRate}</p>
          </div>
        </div>
        <div className="h-5 w-5">
          <ChevronRightIcon className="h-5 w-5" />
        </div>
      </div>
    </motion.li>
  );
};

export default AccountCard;
