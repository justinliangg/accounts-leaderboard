import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useState } from "react";

interface SearchbarProps {
  className?: string;
  onChange: (value: string) => void;
}

const Searchbar = ({ onChange, className }: SearchbarProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (value: string) => {
    setSearchValue(value);
    onChange(value);
  };

  return (
    <div
      className={`flex flex-row py-[8px] px-[8px] gap-2 items-center bg-secondary rounded-[8px] ${className}`}
    >
      <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 " />
      <input
        placeholder="Search"
        className="w-full text-md bg-inherit placeholder-gray-500 outline-none"
        onChange={(e) => handleChange(e.target.value)}
        value={searchValue}
      ></input>
      {searchValue ? (
        <XCircleIcon onClick={() => handleChange("")} className="w-5 h-5 text-gray-500 " />
      ) : null}
    </div>
  );
};

export default Searchbar;
