import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
  {
    name: String,
    complete: {type:Number, default: 0},
    milestoneId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Milestone",
    },
    startDate: Date,
    endDate: Date,
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