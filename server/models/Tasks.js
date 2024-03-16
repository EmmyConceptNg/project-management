import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
  {
    name: String,
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    startDate: Date,
    endData: Date,
    status: {
      type: String,
      enum: ["not started", "ongoing", "completed", "overdue"],
      default: "not started",
    },
    description: String,
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);


export default mongoose.model('Task', TaskSchema);