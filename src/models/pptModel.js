import mongoose from "mongoose";

const pptSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
      trim: true,
    },

    htmlContent: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["generated", "incomplete"],
      default: "generated",
    },

    charCount: {
      type: Number,
    },
  },
  { timestamps: true }
);



export default mongoose.model("ppt",pptSchema);