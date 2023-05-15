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
  authMiddleware.checkAccessToken,
  roleMiddleware.checkRoleAndGivePermission([ERoles.manager, ERoles.admin]),
  roleMiddleware.checkPermission,
  userController.getAll
);

router.get(
  "/:userId",
  authMiddleware.checkAccessToken,
  roleMiddleware.checkRoleAndGivePermission([ERoles.manager, ERoles.admin]),
  userMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userMiddleware.checkUserId,
  userController.getById
);

router.delete(
  "/:userId",
  authMiddleware.checkAccessToken,
  roleMiddleware.checkRoleAndGivePermission([ERoles.manager, ERoles.admin]),
  userMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userMiddleware.checkUserId,
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
  userController.update
);
// route to update user by manager
router.put(
  "/set-role/:userId",
  authMiddleware.checkAccessToken,
  roleMiddleware.checkRoleAndGivePermission([ERoles.manager, ERoles.admin]),
  roleMiddleware.checkPermission,
  userMiddleware.isIdValid,
  userMiddleware.isValidUpdateByAdmin,
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
