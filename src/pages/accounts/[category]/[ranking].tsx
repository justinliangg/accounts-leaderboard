/* eslint-disable @next/next/no-img-element */
import { ChevronLeftIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAccounts } from "@/hooks/accounts";

const Account = () => {
  const router = useRouter();
  const ranking = router.query.ranking as string;
  const category = router.query.category as string;

  const { data: accounts } = useAccounts(category, "");

  const accountDetail = accounts ? accounts?.[Number.parseInt(ranking) - 1] : null;

  return (
    <div className="flex flex-col p-[10px] gap-[15px] h-full overflow-y-auto pb-14 w-full">
      <button
        className="w-8 h-8 cursor-pointer border-2 border-primary rounded-[8px] active:bg-gray-200"
        onClick={() => {
          router.back();
        }}
      >
        <ChevronLeftIcon />
      </button>

      {/* Name and Image */}
      <div className="flex flex-row gap-3 items-center">
        <img
          className="h-[50px] w-[50px] object-cover"
          src={accountDetail?.bankImage}
          alt={`${accountDetail?.bankingProduct} image`}
        />
        <p className="text-lg">{accountDetail?.bankingProduct}</p>
      </div>

      {/* Interest Rates */}
      <table className="table-auto">
        <thead className="text-left">
          <tr>
            {/* Most hacked way */}
            {accountDetail?.category !== "honeymoonRates" ? (
              <>
                <th>Base</th>
                <th>Max Bonus</th>
              </>
            ) : (
              <th>Duration</th>
            )}
            <th>Max Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* Most hacked way */}
            <td>{accountDetail?.base}</td>
            {accountDetail?.category !== "honeymoonRates" ? (
              <td>{accountDetail?.maxBonus}</td>
            ) : null}
            <td>{accountDetail?.maxTotal}</td>
          </tr>
        </tbody>
      </table>

      {/* Requirements */}
      {accountDetail?.requirementForBonus ? (
        <div className="flex flex-col ">
          <p className="font-bold">Requirements For Bonus:</p>
          <p>{accountDetail?.requirementForBonus}</p>
        </div>
      ) : null}

      {/* Comments */}
      {accountDetail?.comments ? (
        <div className="flex flex-col ">
          <p className="font-bold">Comments:</p>
          <p>{accountDetail?.comments}</p>
        </div>
      ) : null}

      {/* Meta Details */}
      <div className="flex flex-col">
        <p className="text-gray-500">{`Effective as of: ${accountDetail?.effectiveAsOf}`}</p>
        <p className="text-gray-500">{`Last checked or edited: ${accountDetail?.lastCheckedOrEdited}`}</p>
      </div>

      {/* More Details */}

      <Link
        rel="noopener noreferrer"
        target="_blank"
        href={accountDetail?.link ?? ""}
        className="self-center flex items-center bg-secondary w-30 max-w-[50%] min-h-10 px-[10px] py-[5px] rounded-[10px] border-[1px]"
      >
        <span className="flex flex-row items-center gap-2">
          <p className="text-nowrap">More details</p>
          <ArrowTopRightOnSquareIcon className="w-5 h-5" />
        </span>
      </Link>
    </div>
  );
};

export default Account;
