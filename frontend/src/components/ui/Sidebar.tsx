import type React from "react";
import { useCallback } from "react";
import { type as osType } from "@tauri-apps/plugin-os";

interface SidebarData {
  [key: string]: {
    name: string;
    icon: string;
  };
}

interface SidebarProps {
  active: string;
  setActive: (active: string) => void;
  data: SidebarData;
  children?: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ active, setActive, data }) => {
  const setActiveTab = useCallback(
    (tab: keyof SidebarData & string) => {
      setActive(tab);
    },
    [setActive],
  );

  // On macOS, shift the sidebar down to make room for the overlaid title bar
  const os_type = osType();
  const sidebar_margin = os_type === "macos" ? "mt-6" : "";

  return (
    <>
      <div
        data-tauri-drag-region
        className={`flex flex-col py-12 items-center ${sidebar_margin}`}
      >
        hledger-dashboard
      </div>
      {(Object.keys(data) as (keyof typeof data & string)[]).map((item) => (
        <button
          key={item}
          type="button"
          className={`text-left rounded-md py-1 px-3 mx-2 transition-transform ${
            active === item
              ? "text-purple-800 bg-purple-400 bg-opacity-15"
              : "hover:bg-purple-200 hover:bg-opacity-15 active:scale-[.99]"
          }`}
          onClick={() => setActiveTab(item)}
        >
          {data[item].name}
        </button>
      ))}
    </>
  );
};
export default Sidebar;
