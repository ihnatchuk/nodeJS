import { Router } from "express";

import { authController, userController } from "../controllers";
import { ERoles } from "../enums";
import { authMiddleware, roleMiddleware, userMiddleware } from "../middlewares";

const router = Router();

router.post(
  "/users",
  authMiddleware.checkAccessToken,
  roleMiddleware.checkRoleAndGivePermission([ERoles.admin]),
  roleMiddleware.checkPermission,
  userMiddleware.isValidCreateByAdmin,
  userMiddleware.getDynamicallyAndThrow("email", "body"),
  authController.register
);
router.put(
  "/users/:userId",
  authMiddleware.checkAccessToken,
  roleMiddleware.checkRoleAndGivePermission([ERoles.admin]),
  roleMiddleware.checkPermission,
  userMiddleware.isValidUpdateByAdmin,
  userMiddleware.getDynamicallyAndThrow("email", "body"),
  userController.update
);
export const adminRouter = router;
