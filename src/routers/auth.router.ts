import { Router } from "express";

import { authController } from "../controllers/authController";
import { userMiddleware } from "../middlewares/user.middleware";

const router = Router();

router.post(
  "/register",
  userMiddleware.isUserValidCreate,
  userMiddleware.getDynamicallyAndThrow("email", "body"),
  authController.register
);
router.post(
  "/login",
  userMiddleware.getDynamicallyorThrow("email", "body"),
  authController.login
);

export const authRouter = router;
