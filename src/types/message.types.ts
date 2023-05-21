import { Types } from "mongoose";

export interface IMessage {
  _user_id?: Types.ObjectId;
  whom: string;
  messageTheme: string;
  messageText: string;
}
