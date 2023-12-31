import { ReactNode } from "react";

interface BottomPaneProps {
  open: boolean;
  children: ReactNode;
}

const BottomPane = ({ open, children }: BottomPaneProps) => {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 ${
        open ? "h-[100%]" : "h-0"
      } bg-white overflow-hidden transition-height duration-500 ease-in-out border-t border-gray-100`}
    >
      <div>{children}</div>
    </div>
  );
};

export default BottomPane;
