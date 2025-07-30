import Task from "../models/Task.js";

export async function getTasks(req, res) {
  try {
    const { category, status } = req.query;

    const filter = { user: req.user.id }; // only tasks of logged-in user

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
    const { _id, title, description, status, timestamp, category } = req.body;

    if (!_id) {
      return res.status(400).json({ message: "Task ID (_id) is required" });
    }

    // Find the task
    const task = await Task.findById(_id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if the task belongs to the logged-in user
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to update this task" });
    }

    // Update allowed fields
    task.title = title;
    task.description = description;
    task.status = status;
    task.timestamp = timestamp;
    task.category = category;

    const updatedTask = await task.save();

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server error while updating task" });
  }
}

export async function deleteTask(req, res) {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if the task belongs to the logged-in user
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this task" });
    }

    await task.deleteOne();

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

    const newTask = new Task({ title, description, status, category, timestamp,user: req.user.id, });
    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error" });
  }
}