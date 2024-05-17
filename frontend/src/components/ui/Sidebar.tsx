import type React from "react";
import { useCallback, useState } from "react";
import { getCurrent } from "@tauri-apps/api/window";

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
      getCurrent()
        .setTitle(data[tab].name)
        .then(() => {
          setActive(tab);
        });
    },
    [data, setActive],
  );

  return (
    <>
      <div className="flex flex-col py-12 items-center">hledger-dashboard</div>
      {(Object.keys(data) as (keyof typeof data)[]).map((item) => (
        <button
          key={item}
          type="button"
          className={`text-left rounded-md py-1 px-3 mx-2 transition-transform ${
            active === item
              ? "text-purple-800 bg-purple-500 bg-opacity-15"
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
