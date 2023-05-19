import { Types } from "mongoose";

export interface ICar {
  _id?: Types.ObjectId;
  _user_id: Types.ObjectId;
  brand: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  active?: boolean;
  activateAttempts?: number;
}
export interface ICarInfo extends ICar {
  fuel?: string;
  engineVolume?: number;
  doors?: number;
  mileage?: number;
  seats?: number;
  color?: string;
  location?: string;
  features?: string[];
  description?: string;
  photos?: string[];
}

export type IPrice = Pick<ICar, "price" | "currency">;
