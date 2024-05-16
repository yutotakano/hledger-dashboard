import { getCurrent } from "@tauri-apps/api/window";
import { Button } from "./components/ui/button";
import { useEffect, useState } from "react";
import type { Event } from "@tauri-apps/api/event";

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
	return (
		<>
			<div className="grid grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] transition-[grid-template-columns] h-full p-1">
				<div className="flex h-full">test</div>
				<div
					className={`flex h-full rounded-md p-1 shadow-md transition-colors bg-white ${main_card_bg}`}
				>
					<Button>click me </Button>
				</div>
			</div>
		</>
	);
}

export default App;
