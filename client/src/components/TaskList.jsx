import TaskCard from "./TaskCard";
import {fetchTasks} from "../api";
import { useEffect,useState } from "react";
import toast from "react-hot-toast";
function TaskList({ category, status, reload,onTaskClick }) {
	

	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error,setError]=useState("");
	useEffect(() => {
		async function loadTasks() {
			setLoading(true);
			try {
				const fetchedTasks = await fetchTasks(category, status);
				setTasks(fetchedTasks);
			} catch (err) {
  const msg = err.response?.data?.message || "fetch failed";
  setError(msg);
  toast(`fetch failed: ${msg}`);
}finally {
				setLoading(false);
			}
		}

		loadTasks();
	}, [category, status,reload]);

	const filteredTasks = tasks.filter((task) => {
		const matchCategory = category ? task.category === category : true;
		const matchStatus = status ? task.status === status : true;
		return matchCategory && matchStatus;
	});
	if (loading) return <p>Loading tasks...</p>;
	if (!tasks.length) return (
		
					<div className="flex flex-wrap  justify-center">
						<img
						src="/notask.jpg"
						loading="lazy"
						alt="NO Task Icon"
						className="w-[60%] "
						/>
							
						</div>
						
				
	);

	return (
		<div className="flex flex-wrap mt-10 gap-[5%] justify-start">
			{filteredTasks.map((task, index) => (
				<div
					key={index}
					className="w-full sm:w-[100%] lg:w-[30%] xl:w-[30%]"
				>
					<TaskCard
						task={task}
					
						onClick={() => onTaskClick(task)} // pass click handler to TaskCard
					/>
				</div>
			))}
		</div>
	);
}
export default TaskList;