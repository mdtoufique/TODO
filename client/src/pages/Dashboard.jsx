import { useState } from "react";
import TaskList from "../components/TaskList";
import TaskDetails from "../components/TaskDetails";
function Dashboard() {
	function CategorySelect({ value, onChange }) {
		const categories = ["shopping", "work", "family", "health", "leisure"];

		return (
			<select
				value={value}
				onChange={onChange}
				className="bg-white px-3 py-1 rounded shadow text-sm"
			>
				<option value="">Select Task Category</option>
				{categories.map((cat) => (
					<option key={cat} value={cat}>
						{cat.charAt(0).toUpperCase() +
							cat.slice(1).toLowerCase()}
					</option>
				))}
			</select>
		);
	}
	const [showModal, setShowModal] = useState(false);
	const [selectedTask, setSelectedTask] = useState(null);
	function handleTaskClick(task) {
		setSelectedTask(task);
		setShowModal(true);
	}
	function StatusSelect({ value, onChange }) {
		const status = ["PENDING", "ONGOING", "DONE", "FAILED"];

		return (
			<select
				value={value}
				onChange={onChange}
				className="bg-white px-3 py-1 rounded shadow text-sm"
			>
				<option value="">All Task</option>
				{status.map((status) => (
					<option key={status} value={status}>
						{status.charAt(0) + status.slice(1).toLowerCase()}
					</option>
				))}
			</select>
		);
	}
	const [category, setCategory] = useState("");
	const [status, setStatus] = useState("");

	return (
		<div className="">
			<div className="fixed top-0 left-0 w-full h-[40%] bg-white shadow flex justify-between items-center px-6 py-3 ">
				<header className="fixed top-0 left-0 w-full bg-white shadow flex items-center justify-between px-6 py-3 z-20">
					{/* Left: App Name */}
					<div className="font-bold text-xl">Tasko</div>

					{/* Center: List + Spin Buttons */}
					<div className="flex items-center gap-4">
						<button className="bg-blue-600 text-white px-4 py-1 rounded shadow hover:bg-blue-700">
							List
						</button>
						<button className="bg-blue-600 text-white px-4 py-1 rounded shadow hover:bg-blue-700">
							SPIN
						</button>
					</div>

					{/* Right: Username */}
					<button className="bg-blue-600 font-medium text-white px-4 py-1 rounded shadow hover:bg-blue-700">
						Username
					</button>
				</header>

				<h1 className="text-4xl font-bold mb-8">Welcome, Username!</h1>
			</div>
			{/*white bg div, taklist + upper info thakbe */}

			<div className="fixed top-5/6 left-1/2 -translate-x-1/2 -translate-y-5/6 w-[90%] h-[70%]  bg-white shadow-lg rounded-xl overflow-auto hide-scrollbar">
				<div className="bg-yellow-500 h-[15%] sticky top-0 z-10 flex items-center justify-between px-6 py-4">
					<h2 className="text-xl font-bold">All Task List</h2>

					<div className="flex items-center gap-4">
						{/* Category Select */}
						<CategorySelect
							value={category}
							onChange={(e) => setCategory(e.target.value)}
						/>

						{/* Status Select */}
						<StatusSelect
							value={status}
							onChange={(e) => setStatus(e.target.value)}
						></StatusSelect>

						{/* Add Task Button */}
						<button className="bg-blue-600 text-white px-4 py-1.5 rounded shadow hover:bg-blue-700 text-sm">
							+ Add Task
						</button>
					</div>
				</div>

				<div className="w-[80%] bg-red-100 relative  left-[9.75%]">
					<TaskList
						category={category}
						status={status}
						onTaskClick={handleTaskClick}
					/>
				</div>
			</div>
			{selectedTask && (
				<TaskDetails
					isOpen={showModal}
					onClose={() => setShowModal(false)}
					{...selectedTask}
				/>
			)}
		</div>
	);
}
export default Dashboard;
