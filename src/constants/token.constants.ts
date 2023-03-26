import { config } from "dotenv";

config();
export const tokenConstants = {
  ACCESS_SECRET: process.env.ACCESS_SECRET || "JWT_ACCESS_SECRET",
  REFRESH_SECRET: process.env.REFRESH_SECRET || "JWT_ACCESS_SECRET",
};
