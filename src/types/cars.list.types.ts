import { Types } from "mongoose";

export interface ICarsListItem {
  _id?: Types.ObjectId;
  brand: string;
  models: string[];
}
