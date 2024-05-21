import mongoose, { model } from "mongoose";
import User from "../interfaces/user.interface";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const userModel = model<User & Document>("User", userSchema);

export default userModel;
