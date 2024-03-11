import mongoose from "mongoose";

const Project = mongoose.Schema(
  {
    name: String,
    description : String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
    },
    team: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        roleId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role",
        },
      },
    ],
    startDate: Date,
    endDate: Date,
    progress: { type: Number, default: 0 },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["pending", "ongoing", "completed", "archived"],
      default: "ongoing",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", Project);
