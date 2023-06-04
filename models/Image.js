import mongoose from "mongoose";

const ImageSchema = mongoose.Schema(
  {
    resource_type: {
      type: String,
    },
    url: {
      type: String,
    },
    public_id: {
      type: String,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    format: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Image", ImageSchema);
