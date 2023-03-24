import { model, Schema } from "mongoose";

import { EGenders } from "../types/user.types";

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
  },
  {
    timestamps: true,
  }
);
export const User = model("user", userSchema);
