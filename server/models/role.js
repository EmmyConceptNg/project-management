import mongoose from "mongoose";

const Role = mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true }
);

export default mongoose.model("Role", Role);
