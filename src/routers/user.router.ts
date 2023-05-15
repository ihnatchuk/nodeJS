import { Router } from "express";

import { userController } from "../controllers";
import { ERoles } from "../enums";
import {
  authMiddleware,
  fileMiddleware,
  roleMiddleware,
  userMiddleware,
} from "../middlewares";

const router = Router();

router.get(
  "/",
  roleMiddleware.checkRole(ERoles.manager),
  userController.getAll
);

router.get(
  "/:userId",
  authMiddleware.checkAccessToken,
  roleMiddleware.checkRole(ERoles.manager),
  userMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userController.getById
);

router.delete(
  "/:userId",
  authMiddleware.checkAccessToken,
  roleMiddleware.checkRole(ERoles.manager),
  userMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userController.delete
);
// route to update user by himself
router.put(
  "/:userId",
  authMiddleware.checkAccessToken,
  userMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userMiddleware.checkUserId,
  userMiddleware.isValidUpdate,
  userMiddleware.getByIdOrThrow,
  userController.update
);
// route to update user by manager
router.put(
  "/set-role/:userId",
  authMiddleware.checkAccessToken,
  userMiddleware.isIdValid,
  userMiddleware.isValidUpdateByMngr,
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
