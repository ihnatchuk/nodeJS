import { Router } from "express";

import { commentsController } from "../controllers";
import {
  authMiddleware,
  carsMiddleware,
  commentsMiddleware,
} from "../middlewares";

const router = Router();

router.get(
  "/:carId",
  carsMiddleware.isIdValid,
  carsMiddleware.getByIdOrThrow,
  commentsController.getByCarId
);

router.post(
  "/:carId",
  authMiddleware.checkAccessToken,
  carsMiddleware.isIdValid,
  carsMiddleware.getByIdOrThrow,
  commentsMiddleware.isValidCreate,
  commentsController.create
);

export const commentsRouter = router;
