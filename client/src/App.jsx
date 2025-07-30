import "./App.css";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    function setVh() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);
	return (
		<>
			<div style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }} className="bg-gray-100">
				<Dashboard />
			</div>
		</>
	);
}

export default App;
