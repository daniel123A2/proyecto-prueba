import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El título es obligatorio"], 
      trim: true,
    },
    content: {
      type: String,
      default: "", 
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El usuario es obligatorio"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
