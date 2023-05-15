import { model, Schema } from "mongoose";

const brandsSchema = new Schema({
  brand: { type: String, required: true, trim: true, unique: true },
  models: [String],
});
export const Brands = model("brands", brandsSchema);
