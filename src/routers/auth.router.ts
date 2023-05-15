import { Router } from "express";

import { authController } from "../controllers";
import { ERoles } from "../enums";
import { roleMiddleware, userMiddleware } from "../middlewares";

const router = Router();

router.post(
  "/register",
  userMiddleware.isValidCreate,
  userMiddleware.getDynamicallyAndThrow("email", "body"),
  userMiddleware.setRole(ERoles.seller),
  authController.register
);
router.post(
  "/create-user",
  roleMiddleware.checkRole(ERoles.manager),
  userMiddleware.isValidCreateByMngr,
  userMiddleware.getDynamicallyAndThrow("email", "body"),
  authController.register
);
router.post(
  "/login",
  userMiddleware.isValidLogin,
  userMiddleware.getDynamicallyorThrow("email", "body"),
  authController.login
);
router.post(
  "/refresh",
  userMiddleware.isValidLogin,
  userMiddleware.getDynamicallyorThrow("email", "body"),
  authController.login
);
export const authRouter = router;
