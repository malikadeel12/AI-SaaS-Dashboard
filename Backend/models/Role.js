import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ["SuperAdmin", "Admin", "Manager", "User"],
      unique: true,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Role", roleSchema);
