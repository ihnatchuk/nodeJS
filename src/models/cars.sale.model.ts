import { model, Schema, Types } from "mongoose";

import { User } from "./user.model";

const carSaleSchema = new Schema(
  {
    _user_id: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
    brand: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    year: { type: Number, required: true },
    active: Boolean,
    fuel: { type: String, trim: true },
    engineVolume: Number,
    doors: Number,
    mileage: Number,
    seats: Number,
    color: { type: String, trim: true },
    location: { type: String, trim: true },
    features: [String],
    description: String,
  },
  {
    versionKey: true,
    timestamps: true,
  }
);
export const CarSale = model("CarSale", carSaleSchema);
