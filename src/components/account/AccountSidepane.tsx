/* eslint-disable @next/next/no-img-element */
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import SidePane from "@/components/common/panels/SidePane";
import { AccountResponse } from "@/types";
import Link from "next/link";

interface AccountSidePaneProps {
  accountDetails: AccountResponse;
  panelOpen: boolean;
  setPanelOpen: (x: boolean) => void;
}
const AccountSidePane = ({ accountDetails, panelOpen, setPanelOpen }: AccountSidePaneProps) => {
  return (
    <SidePane open={panelOpen}>
      <div className="flex flex-col p-[20px] gap-[15px] h-full overflow-y-auto">
        <button
          className="w-7 h-7 cursor-pointer border-2 border-primary rounded-[8px]"
          onClick={() => setPanelOpen(false)}
        >
          <ChevronLeftIcon />
        </button>

        {/* Name and Image */}
        <div className="flex flex-row gap-3 items-center">
          <img
            className="h-[50px] w-[50px] object-cover"
            src={accountDetails.bankImage}
            alt={`${name} image`}
          />
          <p className="text-lg">{accountDetails.bankingProduct}</p>
        </div>

        {/* Interest Rates */}
        <table>
          <thead>
            <tr>
              {/* Most hacked way */}
              {accountDetails.category !== "honeymoonRates" ? (
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
              <td>{accountDetails.base}</td>
              {accountDetails.category !== "honeymoonRates" ? (
                <td>{accountDetails.maxBonus}</td>
              ) : null}
              <td>{accountDetails.maxTotal}</td>
            </tr>
          </tbody>
        </table>

        {/* Requirements */}
        {accountDetails.requirementForBonus ? (
          <div className="flex flex-col ">
            <p className="font-bold">Requirements For Bonus:</p>
            <p>{accountDetails.requirementForBonus}</p>
          </div>
        ) : null}

        {/* Comments */}
        {accountDetails.comments ? (
          <div className="flex flex-col ">
            <p className="font-bold">Comments:</p>
            <p>{accountDetails.comments}</p>
          </div>
        ) : null}

        {/* Meta Details */}
        <div className="flex flex-col">
          <p className="text-gray-500">{`Effective as of: ${accountDetails.effectiveAsOf}`}</p>
          <p className="text-gray-500">{`Last checked or edited: ${accountDetails.lastCheckedOrEdited}`}</p>
        </div>

        {/* More Details */}

        <Link
          rel="noopener noreferrer"
          target="_blank"
          href={accountDetails.link}
          className="self-center flex items-center bg-secondary w-30 max-w-[40%] min-h-10 px-[10px] py-[5px] rounded-[10px] border-[1px]"
        >
          <span className="leading-0">More details</span>
        </Link>
      </div>
    </SidePane>
  );
};

export default AccountSidePane;
