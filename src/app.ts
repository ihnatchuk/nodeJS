import express, { NextFunction, Request, Response } from "express";
import fileUploader from "express-fileupload";
import mongoose from "mongoose";

import { configs } from "./configs";
import { cronRunner } from "./crons";
import {
  adminRouter,
  authRouter,
  brandsRouter,
  carsRouter,
  userRouter,
} from "./routers";
import { currencyRouter } from "./routers/currency.router";
import { IError } from "./types";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUploader());

app.use("/admin", adminRouter);
app.use("/brands", brandsRouter);
app.use("/cars", carsRouter);
app.use("/currency", currencyRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

// --- ERROR HANDLER ---
app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;

  return res.status(status).json({
    message: err.message,
    status,
  });
});
app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.MONGO_URL);
  cronRunner();
  console.log(`Server listen ${configs.PORT}!`);
});
