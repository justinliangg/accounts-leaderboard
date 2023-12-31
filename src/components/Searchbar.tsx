import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChangeEventHandler } from "react";
interface SearchbarProps {
  className?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Searchbar = ({ onChange, className }: SearchbarProps) => {
  return (
    <div
      className={`flex flex-row py-[5px] px-[8px] gap-2 items-center bg-secondary rounded-[5px] ${className}`}
    >
      <MagnifyingGlassIcon className="w-5 h-5" />
      <input
        placeholder="Search"
        className="w-full bg-inherit outline-none"
        onChange={onChange}
      ></input>
    </div>
  );
};

export default Searchbar;
