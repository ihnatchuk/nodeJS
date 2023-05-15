import { Types } from "mongoose";

export interface IBrand {
  _id?: Types.ObjectId;
  brand: string;
  models: string[];
}
