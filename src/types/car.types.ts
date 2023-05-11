import { Types } from "mongoose";

export interface ICar {
  _id?: Types.ObjectId;
  brand: string;
  model: string;
  year: number;
  active?: boolean;
}
export interface ICarInfo extends ICar {
  fuel: string;
  engineVolume: number;
  doors: number;
  mileage: number;
  seats: number;
  color: string;
  location: string;
  features: string[];
  description: string;
}
