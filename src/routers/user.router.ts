import { Router } from "express";

import { authController, userController } from "../controllers";
import { ERoles } from "../enums";
import { authMiddleware, roleMiddleware, userMiddleware } from "../middlewares";

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
  "/update/:userId",
  authMiddleware.checkAccessToken,
  roleMiddleware.checkRoleAndGivePermission([ERoles.manager, ERoles.admin]),
  roleMiddleware.checkPermission,
  userMiddleware.isIdValid,
  userMiddleware.isValidUpdateByAdmin,
  userMiddleware.getByIdOrThrow,
  roleMiddleware.checkSetRole,
  userController.update
);
router.post(
  "/create",
  authMiddleware.checkAccessToken,
  roleMiddleware.checkRoleAndGivePermission([ERoles.manager, ERoles.admin]),
  roleMiddleware.checkPermission,
  userMiddleware.isValidCreateByAdmin,
  userMiddleware.getDynamicallyAndThrow("email", "body"),
  roleMiddleware.checkSetRole,
  authController.register
);

export const userRouter = router;
