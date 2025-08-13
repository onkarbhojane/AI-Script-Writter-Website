// backend/src/models/Script.js
import mongoose from "mongoose";

const scriptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    prompt: {
      type: String,
      required: [true, "Prompt is required"],
    },
    script: {
      type: String,
      required: [true, "Generated script is required"],
    },
    generatedByAI: {
      type: Boolean,
      default: true,
    },
    downloaded: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Script", scriptSchema);
