import Task from "../models/Task.js";

export async function getTasks(req, res) {
	try {
		const { category, status } = req.query;

		const filter = {};
		if (category) filter.category = category;
		if (status) filter.status = status;

		const tasks = await Task.find(filter).sort({ timestamp: -1 });
		res.status(200).json(tasks);
	} catch (error) {
		console.error("Error fetching tasks:", error);
		res.status(500).json({ message: "Server error while fetching tasks" });
	}
}

export async function updateTask(req, res) {
	try {
		const { _id, title, description, status, timestamp,category } = req.body;
    console.log(_id);
		if (!_id) {
      
			return res
				.status(400)
				.json({ message: "Task ID (_id) is required" });
		}

		const updatedTask = await Task.findByIdAndUpdate(
			_id,
			{ title, description, status, timestamp,category },
			{ new: true }
		);

		if (!updatedTask) {
      console.log("hiiii");
			return res.status(404).json({ message: "Task not found" });
		}

		res.status(200).json(updatedTask);
	} catch (error) {

		console.error("Error updating task:", error);
		res.status(500).json({ message: "Server error while updating task" });
	}
}
