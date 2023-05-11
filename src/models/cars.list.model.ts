import { model, Schema } from "mongoose";

const carsListSchema = new Schema({
  brand: { type: String, required: true, trim: true, unique: true },
  models: [String],
});
export const CarsList = model("carsList", carsListSchema);
