import { model, Schema } from "mongoose";

import { EGenders, ERoles } from "../enums";

const userSchema = new Schema(
  {
    name: { type: String, required: true, detail: "" },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    age: { type: Number },
    gender: {
      type: String,
      enum: EGenders,
    },
    phone: {
      type: String,
      required: true,
    },
    role: { type: String, enum: ERoles },
    avatar: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
export const User = model("user", userSchema);
