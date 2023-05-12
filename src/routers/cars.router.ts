import { Router } from "express";

import { carsController } from "../controllers/cars.controller";
import { carsListController } from "../controllers/cars.list.controller";
import { carsListMiddleware } from "../middlewares/cars.list.middleware";
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
  carsListMiddleware.isIdValid,
  carsListMiddleware.isValidUpdate,
  carsListMiddleware.getByIdOrThrow,
  carsListController.update
);

router.delete(
  "/:carId",
  // authMiddleware.checkAccessToken,
  carsListMiddleware.isIdValid,
  carsListMiddleware.getByIdOrThrow,
  carsListController.delete
);

export const carsRouter = router;
