import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function Login() {
	const [form, setForm] = useState({ email: "", password: "" });
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			navigate("/dashboard");
		}
	}, [navigate]);
	function handleChange(e) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const data = await loginUser(form);
			// data.token contains JWT, data.user contains user info

			localStorage.setItem("token", data.token);
			localStorage.setItem("user", JSON.stringify(data.user));
			navigate("/dashboard");
			toast("Login Successfull");
			// redirect or update UI on successful login
		} catch (err) {
			const msg = err.response?.data?.message || "Login failed";
			setError(msg);
			toast(`Login failed: ${msg}`);
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
					Login
				</h2>
				<form
					onSubmit={handleSubmit}
					className="space-y-5"
					autoComplete="off"
				>
					<div>
						<label className="block text-sm font-medium text-gray-600">
							Email
						</label>
						<input
							type="email"
							name="email"
							value={form.email}
							onChange={handleChange}
							autoComplete="off"
							required
							className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-600">
							Password
						</label>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								name="password"
								value={form.password}
								autoComplete="off"
								onChange={handleChange}
								required
								className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring focus:ring-blue-200"
							/>
							<button
								type="button"
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500"
								onClick={() => setShowPassword((prev) => !prev)}
							>
								{showPassword ? "🙈" : "👁️"}
							</button>
						</div>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
					>
						Login
					</button>
				</form>
				<p className="text-center text-sm text-gray-500 mt-4">
					Don't have an account?{" "}
					<Link
						to="/signup"
						className="text-blue-600 hover:underline"
					>
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
}
