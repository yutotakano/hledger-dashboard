import { getCurrent } from "@tauri-apps/api/window";
import { Button } from "./components/ui/button";
import { useEffect, useState } from "react";
import type { Event } from "@tauri-apps/api/event";
import Sidebar from "./components/ui/Sidebar";

const useOnFocusChanged = (callback: (focused: boolean) => void) => {
  // Use a listener for appWindow.onFocusChanged, and clean it up
  // when the component unmounts. The Tauri IPC is only available to listen on
  // after the window object is available, which we ensure by using useEffect,
  // which only runs after renders (+ when variables are changed).
  useEffect(() => {
    const onFocusChanged = (focused: Event<boolean>) => {
      callback(focused.payload);
    };

    const unlisten = getCurrent().onFocusChanged(onFocusChanged);

    return () => {
      unlisten.then((result) => {
        if (!result) {
          console.error("Failed to unlisten onFocusChanged");
        }
      });
    };
  }, [callback]);
};

function App() {
  const [focused, setFocused] = useState(false);
  useOnFocusChanged(setFocused);

  const main_card_bg = focused ? "bg-opacity" : "bg-opacity-90";

  const [active, setActive] = useState("overview");

  const data = {
    overview: {
      name: "Overview",
      icon: "home",
    },
    extra: {
      name: "Extra",
      icon: "extra",
    },
    settings: {
      name: "Settings",
      icon: "settings",
    },
  };

  return (
    <>
      <div className="grid grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] transition-[grid-template-columns] h-full p-1">
        <div className="flex h-full flex-col">
          <Sidebar active={active} setActive={setActive} data={data} />
        </div>
        <div
          className={`flex flex-col h-full rounded-md p-4 shadow-md transition-colors bg-white border border-gray-200 ${main_card_bg}`}
        >
          {active === "overview" && (
            <>
              <h1 className="text-3xl my-3 font-bold">Overview</h1>
              <br />
              <Button>click me </Button>
            </>
          )}
          {active === "extra" && (
            <h1 className="text-3xl my-3 font-bold">Extra</h1>
          )}
          {active === "settings" && (
            <h1 className="text-3xl my-3 font-bold">Settings</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
