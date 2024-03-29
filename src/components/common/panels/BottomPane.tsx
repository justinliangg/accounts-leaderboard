import { ReactNode, useEffect } from "react";

interface BottomPaneProps {
  open: boolean;
  children: ReactNode;
}

const BottomPane = ({ open, children }: BottomPaneProps) => {
  // disable overflow on main body when pane is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 h-[100%] ${
        open ? "translate-y-0" : "translate-y-full"
      } bg-white overflow-hidden transition-all duration-500 ease-in-out border-t border-gray-100 pb-14`}
    >
      <div>{children}</div>
    </div>
  );
};

export default BottomPane;
