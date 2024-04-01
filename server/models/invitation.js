import mongoose from 'mongoose'
const invitationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },
    url: String,
  },
  { timestamps: true }
);

export default mongoose.model("Invitation", invitationSchema);
