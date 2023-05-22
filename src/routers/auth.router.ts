import { Router } from "express";

import { authController } from "../controllers";
import { EActionTokenType, ERoles } from "../enums";
import {
  authMiddleware,
  commonMiddleware,
  userMiddleware,
} from "../middlewares";
import { UserValidator } from "../validators";

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
  "/password/change",
  commonMiddleware.isBodyValid(UserValidator.changeUserPassword),
  authMiddleware.checkAccessToken,
  authController.changePassword
);

router.post(
  "/password/forgot",
  commonMiddleware.isBodyValid(UserValidator.emailValidator),
  userMiddleware.getDynamicallyOrThrow("email"),
  authController.forgotPassword
);

router.put(
  `/password/forgot/:token`,
  authMiddleware.checkActionToken(EActionTokenType.forgot),
  authMiddleware.checkOldPassword,
  authController.setForgotPassword
);

router.post(
  "/activate",
  commonMiddleware.isBodyValid(UserValidator.emailValidator),
  userMiddleware.getDynamicallyOrThrow("email"),
  authController.sendActivateToken
);

router.put(
  `/activate/:token`,
  authMiddleware.checkActionToken(EActionTokenType.activate),
  authController.activate
);
router.post(
  "/refresh",
  userMiddleware.isValidLogin,
  userMiddleware.getDynamicallyorThrow("email", "body"),
  authController.login
);
export const authRouter = router;
