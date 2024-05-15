import { WindowTitlebar } from "tauri-controls";
import { Button } from "./components/ui/button";

function App() {
	return (
		<>
			<WindowTitlebar>title</WindowTitlebar>
			<Button>click me </Button>
		</>
	);
}

export default App;
