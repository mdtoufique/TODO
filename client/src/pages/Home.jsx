import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
export default function Home() {
    const navigate = useNavigate();
    useEffect(() => {
            const token = localStorage.getItem("token");
            if (token) {
                navigate("/dashboard");
            }
        }, [navigate]);
	return (
		<div className="flex h-screen">
			{/* Left side: Image */}
			<div className="w-1/2 hidden md:block">
				<img
					src="/home.jpg"
                    loading="lazy"
					alt="Home Visual"
					className="h-full w-full object-cover"
				/>
			</div>

			{/* Right side: Buttons */}
			<div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 via-white to-gray-200 px-8">
				<h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome to Tasko</h1>
				
				<div className="flex gap-6">
					<Link to="/login">
						<button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 text-lg font-semibold transition">
							Login
						</button>
					</Link>
					<Link to="/signup">
						<button className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg shadow hover:bg-blue-50 text-lg font-semibold transition">
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
