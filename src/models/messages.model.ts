import { model, Schema, Types } from "mongoose";

import { EWhom } from "../enums/messages.enum";
import { User } from "./user.model";

const messagesSchema = new Schema(
  {
    _user_id: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
    whom: { type: String, enum: EWhom, required: true },
    messageTheme: { type: String, required: true },
    messageText: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export const Messages = model("messages", messagesSchema);
