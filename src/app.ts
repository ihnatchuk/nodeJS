import express, { NextFunction, Request, Response } from "express";
import fileUploader from "express-fileupload";
import mongoose from "mongoose";

import { configs } from "./configs";
import { authRouter, userRouter } from "./routers";
import { carsListRouter } from "./routers/cars.list.router";
import { carsRouter } from "./routers/cars.router";
import { IError } from "./types";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUploader());

app.use("/brands", carsListRouter);
app.use("/cars", carsRouter);
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
  console.log(`Server listen ${configs.PORT}!`);
});
