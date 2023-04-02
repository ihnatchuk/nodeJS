import { Router } from "express";

import { userController } from "../controllers";
import { authMiddleware, userMiddleware } from "../middlewares";
import { fileMiddleware } from "../middlewares/file.middleware";

const router = Router();

router.get("/", userController.getAll);

router.get(
  "/:userId",
  authMiddleware.checkAccessToken,
  userMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userController.getById
);

router.delete(
  "/:userId",
  authMiddleware.checkAccessToken,
  userMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userController.delete
);

router.put(
  "/:userId",
  authMiddleware.checkAccessToken,
  userMiddleware.isIdValid,
  userMiddleware.isValidUpdate,
  userMiddleware.getByIdOrThrow,
  userController.update
);
router.put(
  "/:userId/avatar",
  authMiddleware.checkAccessToken,
  userMiddleware.isIdValid,
  fileMiddleware.isAvatarValid,
  userMiddleware.getByIdOrThrow,
  userController.uploadAvatar
);

export const userRouter = router;
