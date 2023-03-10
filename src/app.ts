import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { configs } from "./config/configs";
import { userRouter } from "./routers/user.router";
import { IError } from "./types/common.types";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status).json({ message: err.message });
});
app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.MONGO_URL);
  console.log(`Server listen ${configs.PORT}`);
});
