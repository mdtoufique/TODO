import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { signupUser } from "../api";
import { useNavigate} from "react-router-dom";
export default function Signup() {
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
	function handleChange(e) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}
    function passwordsMatch() {
    return form.password === form.confirmPassword;
  }
	async function handleSubmit(e) {
    e.preventDefault();
    if (!passwordsMatch()) {
      setError("Passwords do not match");
      return;
    }
    try {
      await signupUser(form);
      navigate("/login");
      toast("Sign up Sueccessful.Please Login.");

      // success logic here, e.g. redirect or message
    } catch (err) {
  const msg = err.response?.data?.message || "";
  setError(msg);
  toast(`Signup failed: ${msg}`);
}
  }

	return (
		<div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
			{/* Left Image */}
			<div className="hidden md:block">
				<img
					src="/signup.jpg"
					alt="Signup"
					className="w-full h-full object-cover"
				/>
			</div>

			{/* Right Form */}
			<div className="flex items-center justify-center bg-gray-100">
				<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
					<h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
						Create Account
					</h2>
					<form onSubmit={handleSubmit} className="space-y-5"  autoComplete="off">
						<div>
							<label className="block text-sm font-medium text-gray-600">
								Name
							</label>
							<input
								type="text"
								name="name"
								value={form.name}
                                 autoComplete="off"
								onChange={handleChange}
								required
								className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-600">
								Email
							</label>
							<input
								type="email"
								name="email"
                                 autoComplete="off"
								value={form.email}
								onChange={handleChange}
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
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500"
									onClick={() => setShowPassword((prev) => !prev)}
								>
									{showPassword ? "🙈" : "👁️"}
								</button>
							</div>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-600">
								Confirm Password
							</label>
							<div className="relative">
								<input
									type={showConfirm ? "text" : "password"}
									name="confirmPassword"
									value={form.confirmPassword}
                                     autoComplete="off"
									onChange={handleChange}
									required
									className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring focus:ring-blue-200"
								/>
								<button
									type="button"
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500"
									onClick={() => setShowConfirm((prev) => !prev)}
								>
									{showConfirm ? "🙈" : "👁️"}
								</button>
							</div>
						</div>

						<button
							type="submit"
							className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
						>
							Sign Up
						</button>
					</form>
					<p className="text-center text-sm text-gray-500 mt-4">
						Already have an account?{" "}
						<Link to="/login" className="text-blue-600 hover:underline">
							Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
