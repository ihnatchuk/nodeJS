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

export const statisticsRouter = router;
