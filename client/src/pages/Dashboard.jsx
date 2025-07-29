import { useState } from "react";
import TaskList from "../components/TaskList";
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
            {cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()}
          </option>
        ))}
      </select>
    );
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
			<div></div>
			{/*white bg div, taklist + upper info thakbe */}

			<div className=" w-[80%] h-[70%] fixed top-[20.75%] left-[10.75%]  bg-white/80 shadow-lg rounded-xl overflow-auto hide-scrollbar">
				<div className="bg-yellow-500 h-[20%] sticky top-0 z-10 flex items-center justify-between px-6 py-4">
					<h2 className="text-xl font-bold">All Task List</h2>

					<div className="flex items-center gap-4">
						{/* Category Select */}
						<CategorySelect value={category} onChange={(e) => setCategory(e.target.value)} />

						{/* Status Select */}
						<StatusSelect value={status} onChange={(e)=>setStatus(e.target.value)}></StatusSelect>

						{/* Add Task Button */}
						<button className="bg-blue-600 text-white px-4 py-1.5 rounded shadow hover:bg-blue-700 text-sm">
							+ Add Task
						</button>
					</div>
				</div>

				<div className="w-[80%] bg-red-100 relative  left-[9.75%]">
					<TaskList  category={category} status={status} />
				</div>
			</div>
		</div>
	);
}
export default Dashboard;
