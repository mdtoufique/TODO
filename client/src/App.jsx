import "./App.css";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import Home from "./pages/Home";
import { Route,Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
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
				<Routes>
        <Route path="/" element={<Home />} />
        <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
			</div>
		</>
	);
}

export default App;
