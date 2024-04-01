import mongoose from "mongoose";

const MilestoneSchema = new mongoose.Schema(
  {
    name: String,
    taskCount: String,
    tasks: [],
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    startDate: Date,
    endDate: Date,
    complete: String,
    schedule: String,
    notes: String,
    status: {
      type: String,
      enum: ["on track", "off track"],
      default: "on track",
    },
    description: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Milestone", MilestoneSchema);
