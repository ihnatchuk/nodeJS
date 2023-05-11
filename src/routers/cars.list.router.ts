import { Router } from "express";

import { carsListController } from "../controllers/cars.list.controller";
import { carsListMiddleware } from "../middlewares/cars.list.middleware";
// import { authMiddleware } from "../middlewares";

const router = Router();

router.get("/", carsListController.getAll);

router.post(
  "/",
  // authMiddleware.checkAccessToken,
  carsListMiddleware.isValidCreate,
  carsListController.create
);

router.put(
  "/:carBrandId",
  // authMiddleware.checkAccessToken,
  carsListMiddleware.isIdValid,
  carsListMiddleware.isValidUpdate,
  carsListMiddleware.getByIdOrThrow,
  carsListController.update
);

router.delete(
  "/:carBrandId",
  // authMiddleware.checkAccessToken,
  carsListMiddleware.isIdValid,
  carsListMiddleware.getByIdOrThrow,
  carsListController.delete
);

export const carsListRouter = router;
