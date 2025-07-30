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
				className="bg-white px-3 py-1 rounded shadow text-xs sm:text-sm w-[90px] sm:w-auto"
			>
				<option value="">Category</option>
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
	const [reload, setReload] = useState(false);

function reloadTasks() {
  setReload((prev) => !prev);
}
	function StatusSelect({ value, onChange }) {
		const status = ["PENDING", "ONGOING", "DONE","COLLABORATIVE_TASK"];

		return (
			<select
				value={value}
				onChange={onChange}
				className="bg-white px-3 py-1 rounded shadow text-xs sm:text-sm w-[90px] sm:w-auto"
			>
				<option value="">Status</option>
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
			<div className="fixed top-0 left-0 w-full h-[40%] bg-gray-300 shadow flex justify-between items-center px-6 py-3 ">
				<header className="fixed top-0 left-0 w-full  flex items-center justify-between px-6 py-3 z-20">
					{/* Left: App Name */}
					<div className="font-bold text-xl">Tasko</div>

					{/* Center: List + Spin Buttons */}
					<div className="flex items-center gap-4">
						<button className="bg-blue-600 text-white px-3 py-1 rounded text-xs sm:text-sm shadow hover:bg-blue-700">
							List
						</button>
						<button className="bg-blue-600 text-white px-3 py-1 rounded text-xs sm:text-sm shadow hover:bg-blue-700">
							SPIN
						</button>
					</div>

					{/* Right: Username */}

					<button className="bg-blue-600 text-white px-3 py-1 rounded text-xs sm:text-sm font-medium shadow hover:bg-blue-700">
						Username
					</button>
				</header>

				<div className="mx-[10%] mb-8">
					<h2 className="text-base sm:text-lg text-gray-600 font-medium">
						Hi, Username!
					</h2>
					<h1 className="text-2xl sm:text-4xl font-bold mt-1">
						Welcome to your Dashboard
					</h1>
				</div>
			</div>
			{/*white bg div, taklist + upper info thakbe */}

			<div className="fixed top-5/6 left-1/2 -translate-x-1/2 -translate-y-5/6 w-[90%] h-[70%]  bg-white shadow-lg rounded-xl overflow-auto hide-scrollbar">
				<div className="bg-white h-[15%] sticky top-0 z-10 flex items-center justify-between px-6 py-4">
					<h3 className="text-sm sm:pl-[50px] sm:text-lg sm:font-semibold">
						Task List
					</h3>

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
						<button className="bg-blue-600 text-white px-3 py-1 rounded text-xs sm:text-sm shadow hover:bg-blue-700">
							Add Task
						</button>
					</div>
				</div>

				<div className="w-[90%]  relative  mx-auto">
					<TaskList
						category={category}
						status={status}
						reload={reload}
						onTaskClick={handleTaskClick}
					/>
				</div>
			</div>
			{selectedTask && (
				<TaskDetails
					isOpen={showModal}
					onClose={() => setShowModal(false)}
					reloadTrigger={reloadTasks}
					{...selectedTask}
					
				/>
			)}
		</div>
	);
}
export default Dashboard;
