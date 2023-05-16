import { model, Schema, Types } from "mongoose";

import { EStats } from "../enums/stats.enum";
import { CarSale } from "./cars.sale.model";

const statsSchema = new Schema(
  {
    _car_id: {
      type: Types.ObjectId,
      required: true,
      ref: CarSale,
    },
    action: { type: String, enum: EStats, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export const Stats = model("stats", statsSchema);
