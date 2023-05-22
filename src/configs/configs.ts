import { config } from "dotenv";
config();

export const configs = {
  PORT: process.env.PORT || 5001,
  MONGO_URL: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/test",

  ACCESS_SECRET: process.env.ACCESS_SECRET || "JWT_ACCESS_SECRET",
  REFRESH_SECRET: process.env.REFRESH_SECRET || "JWT_ACCESS_SECRET",
  FORGOT_SECRET: process.env.JWT_FORGOT_SECRET || "JWT_FORGOT_SECRET",
  ACTIVATE_SECRET: process.env.JWT_ACTIVATE_SECRET || "JWT_ACTIVATE_SECRET",

  FRONT_URL: process.env.FRONT_URL,

  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || "backproject2023@gmail.com",
  NO_REPLY_EMAIL_PASSWORD:
    process.env.NO_REPLY_EMAIL_PASSWORD || "vowgpngpycpselhf",

  AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
  AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY,

  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,

  AWS_S3_NAME: process.env.AWS_S3_NAME,
  AWS_S3_REGION: process.env.AWS_S3_REGION,
  AWS_S3_URL: process.env.AWS_S3_URL,
  AWS_S3_ACL: process.env.AWS_S3_ACL,
};
