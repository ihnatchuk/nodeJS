import { Router } from "express";

import { authController } from "../controllers";
import { ERoles } from "../enums";
import { authMiddleware, roleMiddleware, userMiddleware } from "../middlewares";

const router = Router();

router.post(
  "/register",
  authMiddleware.checkAccessToken,
  roleMiddleware.checkRoleAndGivePermission([ERoles.admin]),
  userMiddleware.isValidCreateByAdmin,
  userMiddleware.getDynamicallyAndThrow("email", "body"),
  authController.register
);
export const adminRouter = router;
