import { Router } from "express";

import { authController } from "../controllers";
import { ERoles } from "../enums";
import { userMiddleware } from "../middlewares";

const router = Router();

router.post(
  "/register",
  userMiddleware.isValidCreate,
  userMiddleware.getDynamicallyAndThrow("email", "body"),
  userMiddleware.setRole(ERoles.seller),
  authController.register
);

router.post(
  "/register/admin",
  userMiddleware.isValidCreate,
  userMiddleware.getDynamicallyAndThrow("email", "body"),
  userMiddleware.setRole(ERoles.admin),
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
