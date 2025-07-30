import { useState,useEffect } from "react";
import TaskList from "../components/TaskList";
import TaskDetails from "../components/TaskDetails";
import { fetchTasks,addTasks } from "../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Dashboard() {
	const navigate = useNavigate();
	const [error,setError]=useState("")
	const [categories,setCategories]=useState([])
	function handleLogout() {
    localStorage.clear(); 
    navigate("/login");
  }
	useEffect(() => {
  async function loadCategories() {
    try {
      const fetchedTasks = await fetchTasks(); // Fetch all tasks
      const uniqueCategories = Array.from(
        new Set(fetchedTasks.map(task => task.category).filter(Boolean))
      );
      setCategories(uniqueCategories);
    } catch (err) {
  const msg = err.response?.data?.message || "Fetch category failed";
  setError(msg);
  toast(`Fetch category failed: ${msg}`);
}
  }

  loadCategories();
}, []);
	function CategorySelect({ value, onChange }) {
		

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


const [ShowForm, setShowForm] = useState(false);

	async function handleAddTask(newTask) {
			try {
				await addTasks(newTask);
				reloadTasks();
				setShowForm(false)
				toast.success("Task added Successfully!");

				
			} catch (error) {
				toast.error("Failed to delete task",error);
				// Handle error, show message etc.
			}
		}

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

					<div className="flex items-center gap-3">
            <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs sm:text-sm font-medium shadow hover:bg-blue-700">
              Username
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-3 py-1 rounded text-xs sm:text-sm font-medium shadow hover:bg-red-700"
            >
              Logout
            </button>
          </div>
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
							options={categories}
						/>

						{/* Status Select */}
						<StatusSelect
							value={status}
							onChange={(e) => setStatus(e.target.value)}
						></StatusSelect>

						{/* Add Task Button */}
						<button 
						onClick={()=>setShowForm(true)}
						className="bg-blue-600 text-white px-3 py-1 rounded text-xs sm:text-sm shadow hover:bg-blue-700">
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
			{ShowForm && (
  <>
    <div className="fixed inset-0  bg-opacity-50 z-40" ></div>
    <div className="fixed z-50 bg-white fixed top-3/4 left-1/2 -translate-x-1/2 -translate-y-3/4 w-[90%] h-[85%] p-6 rounded-xl shadow-xl flex flex-col gap-4">
      <h2 className="m-10 text-xl font-bold mb-4">Add New Task</h2>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target;
          const newTask = {
            title: form.title.value,
            description: form.description.value,
            category: form.category.value,
            status: form.status.value,
            timestamp: form.timestamp.value,
          };

          handleAddTask(newTask);
        }}
        className="space-y-4 m-10"
      >
        <input
          type="text"
          name="title"
          maxLength={50}
          placeholder="Task Title"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          name="description"
          maxLength={200}
          placeholder="Description"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <select
          name="status"
          required
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Status</option>
          <option value="PENDING">Pending</option>
          <option value="ONGOING">Ongoing</option>
          <option value="DONE">Done</option>
          <option value="COLLABORATIVE_TASK">Collaborative</option>
        </select>
        <input
          type="date"
          name="timestamp"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  </>
)}

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
