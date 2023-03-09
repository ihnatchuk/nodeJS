import { config } from "dotenv";
config();

export const configs = {
  PORT: process.env.PORT || 5001,
  MONGO_URL: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/test",
};
