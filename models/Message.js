import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, "Please provide message"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Message", MessageSchema);
