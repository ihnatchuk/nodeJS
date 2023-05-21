import { Router } from "express";

import { messagesController } from "../controllers";
import { ERoles } from "../enums";
import {
  authMiddleware,
  messagesMiddleware,
  roleMiddleware,
} from "../middlewares";

const router = Router();

router.get(
  "/",
  authMiddleware.checkAccessToken,
  roleMiddleware.checkRoleAndGivePermission([ERoles.manager, ERoles.admin]),
  roleMiddleware.checkPermission,
  messagesController.getAll
);

router.get("/my", authMiddleware.checkAccessToken, messagesController.getMy);

router.post(
  "/",
  authMiddleware.checkAccessToken,
  messagesMiddleware.isValidCreate,
  messagesController.create
);

router.delete(
  "/:messageId",
  authMiddleware.checkAccessToken,
  roleMiddleware.checkRoleAndGivePermission([ERoles.manager, ERoles.admin]),
  roleMiddleware.checkPermission,
  messagesMiddleware.isIdValid,
  messagesMiddleware.getByIdOrThrow,
  messagesController.delete
);

export const messagesRouter = router;
