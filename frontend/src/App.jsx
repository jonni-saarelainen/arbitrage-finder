import "./App.css";
import NavBar from "./components/NavBar.jsx";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";

function App() {
	const [lastRefresh, setLastRefresh] = useState(null);

	return (
		<>
			<NavBar lastRefresh={lastRefresh} />
			<Dashboard setLastRefresh={setLastRefresh} />
		</>
	);
}

export default App;
