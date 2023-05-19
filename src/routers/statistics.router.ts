import { Router } from "express";

import { statisticsController } from "../controllers";
import { ERoles } from "../enums";
import { authMiddleware, carsMiddleware, roleMiddleware } from "../middlewares";

const router = Router();

router.get(
  "/views/:carId/:days",
  authMiddleware.checkAccessToken,
  roleMiddleware.checkRoleAndGivePermission([ERoles.premiumSeller]),
  roleMiddleware.checkPermission,
  carsMiddleware.isIdValid,
  carsMiddleware.getByIdOrThrow,
  statisticsController.getViews
);
router.get(
  // region average price
  "/rap/:carId/",
  authMiddleware.checkAccessToken,
  roleMiddleware.checkRoleAndGivePermission([ERoles.premiumSeller]),
  roleMiddleware.checkPermission,
  carsMiddleware.isIdValid,
  carsMiddleware.getByIdOrThrow,
  statisticsController.getRegionAveragePrice
);
router.get(
  // average price in all regions
  "/ap/:carId/",
  authMiddleware.checkAccessToken,
  roleMiddleware.checkRoleAndGivePermission([ERoles.premiumSeller]),
  roleMiddleware.checkPermission,
  carsMiddleware.isIdValid,
  carsMiddleware.getByIdOrThrow,
  statisticsController.getAveragePrice
);
export const statisticsRouter = router;
