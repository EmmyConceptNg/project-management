import mongoose from "mongoose";

const Workspace = new mongoose.Schema(
  {
    name: String,
    numberOfProjects: Number,
    numberOfPeople: Number,
    team: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        specialityClass: String,
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Workspace", Workspace);
