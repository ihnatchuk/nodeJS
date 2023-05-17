import { model, Schema } from "mongoose";

const currencySchema = new Schema(
  {
    uah: { type: Number, required: true },
    eur: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export const Currency = model("currency", currencySchema);
