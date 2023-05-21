import { model, Schema, Types } from "mongoose";

import { User } from "./user.model";

const commentsSchema = new Schema(
  {
    _user_id: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
    _car_id: { type: String, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export const Comments = model("comments", commentsSchema);
