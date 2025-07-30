import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "ONGOING", "COLLABORATIVE_TASK", "DONE"],
      default: "PENDING",
    },
    category: {
      type: String,
      default: "general",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    timestamp: {
      type: Date,
      default: () => {
        const now = new Date();
        now.setHours(0, 0, 0, 0); 
        return now;
      },
    },
  },
  { timestamps: true },
  
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
