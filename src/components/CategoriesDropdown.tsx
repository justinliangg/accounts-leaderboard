import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import BottomPane from "@/components/BottomPane";
import { useCategories } from "@/hooks/accounts";
import { camelToNormal } from "@/lib/string";

interface DropdownProps {
  className?: string;
  selectedCategory: string;
  handleChange: (x: string) => void;
}

const CategoriesDropdown = ({ className, handleChange, selectedCategory }: DropdownProps) => {
  const [panelOpen, setPanelOpen] = useState(false);
  const { data: categories, isLoading } = useCategories();

  return (
    <div className={`bg-secondary p-[10px] rounded-[8px] cursor-pointer ${className}`}>
      <div
        className={`flex flex-row justify-between items-center`}
        onClick={() => {
          setPanelOpen(true);
        }}
      >
        <p className="text-md line-clamp-1">{camelToNormal(selectedCategory)}</p>
        <ChevronDownIcon className="w-5 h-5" />
      </div>
      <BottomPane open={panelOpen}>
        <div className="h-12 px-[20px] items-center flex flex-row justify-between">
          <p className="text-md font-bold">Categories</p>
          <XMarkIcon className="w-5 h-5 cursor-pointer" onClick={() => setPanelOpen(false)} />
        </div>
        <div className="bg-secondary text-gray-500 px-[20px] py-[8px] border-t">
          {!isLoading
            ? categories?.map((c) => {
                return (
                  <div key={c} className="h-8">
                    <p
                      onClick={() => {
                        handleChange(c);
                        setPanelOpen(false);
                      }}
                    >
                      {camelToNormal(c)}
                    </p>
                  </div>
                );
              })
            : null}
        </div>
      </BottomPane>
    </div>
  );
};

export default CategoriesDropdown;
