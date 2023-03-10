import express from "express";
import mongoose from "mongoose";

import { configs } from "./config/configs";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.MONGO_URL);
  console.log(`Server listen ${configs.PORT}`);
});
