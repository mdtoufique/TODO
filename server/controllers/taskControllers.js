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

export async function deleteTask(req, res) {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function createTask(req, res) {
  try {
    const { title, description, status, category, timestamp } = req.body;

    if (!title || title.length > 25) {
      return res.status(400).json({ message: "Title is required and must be 25 characters or less." });
    }

    if (description && description.length > 100) {
      return res.status(400).json({ message: "Description must be 100 characters or less." });
    }

    const newTask = new Task({ title, description, status, category, timestamp });
    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error" });
  }
}