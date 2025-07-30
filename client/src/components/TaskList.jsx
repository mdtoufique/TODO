import TaskCard from "./TaskCard";
import {fetchTasks} from "../api";
import { useEffect,useState } from "react";
function TaskList({ category, status, reload,onTaskClick }) {
	

	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function loadTasks() {
			setLoading(true);
			try {
				const fetchedTasks = await fetchTasks(category, status);
				setTasks(fetchedTasks);
			} catch (error) {
				// handle error (e.g., show notification)
			} finally {
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
	if (!tasks.length) return <p>No tasks found.</p>;

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