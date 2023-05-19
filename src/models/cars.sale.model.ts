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
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    fuel: { type: String, trim: true },
    engineVolume: Number,
    doors: Number,
    mileage: Number,
    seats: Number,
    color: { type: String, trim: true },
    location: { type: String, trim: true, required: true },
    features: [String],
    description: { type: String, trim: true },
    photos: [String],
    active: Boolean,
    activateAttempts: Number,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export const CarSale = model("CarSale", carSaleSchema);
