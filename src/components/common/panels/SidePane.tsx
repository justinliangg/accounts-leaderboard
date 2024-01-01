import { useState, ReactNode, useEffect } from "react";

interface SidePaneProps {
  children: ReactNode;
  open: boolean;
}
const SidePane = ({ children, open }: SidePaneProps) => {
  // disable overflow on main body when pane is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-y-0 right-0 w-full bg-white transform ${
        open ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-500 ease-in-out pb-14`}
    >
      {/* Your panel content goes here */}
      {children}
    </div>
  );
};

export default SidePane;
