import { Router } from "express";

import { carsController } from "../controllers/cars.controller";
import { carsMiddleware } from "../middlewares/cars.middleware";
// import { authMiddleware } from "../middlewares";

const router = Router();

router.get("/", carsController.getAll);

router.post(
  "/",
  // authMiddleware.checkAccessToken,
  carsMiddleware.isValidCreate,
  carsController.create
);

router.put(
  "/:carId",
  // authMiddleware.checkAccessToken,
  carsMiddleware.isIdValid,
  carsMiddleware.isValidUpdate,
  carsMiddleware.getByIdOrThrow,
  carsController.update
);

router.delete(
  "/:carId",
  // authMiddleware.checkAccessToken,
  carsMiddleware.isIdValid,
  carsMiddleware.getByIdOrThrow,
  carsController.delete
);

export const carsRouter = router;
