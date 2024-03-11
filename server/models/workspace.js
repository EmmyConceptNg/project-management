import mongoose from "mongoose";

const Workspace = mongoose.Schema(
  {
    name: String,
    numberOfProjects: Number,
    numberOfPeople: Number,
    link:String,
    team: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        specialityClass : String,

      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    industry: String,
  },
  { timestamps: true }
);

export default mongoose.model("Workspace", Workspace);
