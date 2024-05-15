import { Button } from "./components/ui/button";

function App() {
	return (
		<>
			<div className="grid w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
				<div className="flex h-full">test</div>
				<div className="flex">
					<Button>click me </Button>
				</div>
			</div>
		</>
	);
}

export default App;
