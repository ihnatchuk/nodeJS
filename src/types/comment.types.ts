import { Types } from "mongoose";

export interface IComment {
  _user_id: Types.ObjectId;
  _car_id: string;
  comment: string;
}
