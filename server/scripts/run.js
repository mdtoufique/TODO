import mongoose from "mongoose";
import dotenv from "dotenv";
import Task from "../models/Task.js";

dotenv.config();

const sampleTasks = [
  {
    title: "Buy groceries",
    description: "Milk, bread, eggs, and fruits",
    status: "PENDING",
    category: "shopping",
    timestamp: new Date("2025-06-24T00:00:00Z"),
  },
  {
    title: "Finish project report",
    description: "Complete the quarterly report for finance",
    status: "ONGOING",
    category: "work",
    timestamp: new Date("2025-06-20T00:00:00Z"),
  },
  {
    title: "Team meeting",
    description: "Discuss project roadmap with collaborators",
    status: "COLLABORATIVE_TASK",
    category: "work",
    timestamp: new Date("2025-06-22T00:00:00Z"),
  },
  {
    title: "Yoga session",
    description: "Attend online yoga class",
    status: "DONE",
    category: "health",
    timestamp: new Date("2025-06-18T00:00:00Z"),
  },
  {
    title: "Fix bug in app",
    description: "Resolve login issue reported by QA",
    status: "FAILED",
    category: "development",
    timestamp: new Date("2025-06-23T00:00:00Z"),
  },
];

async function seedTasks() {
  try {
    // Connect to local MongoDB TODO database
    await mongoose.connect("mongodb://localhost:27017/TODO", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    // Insert tasks
    await Task.insertMany(sampleTasks);
    console.log("Sample tasks inserted!");

    // Disconnect after done
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error inserting tasks:", error);
  }
}

seedTasks();
