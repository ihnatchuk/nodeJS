import { Router } from "express";

import { brandsController } from "../controllers";
import { ERoles } from "../enums";
import {
  authMiddleware,
  brandsMiddleware,
  roleMiddleware,
} from "../middlewares";

const router = Router();

router.get("/", brandsController.getAll);

router.post(
  "/",
  authMiddleware.checkAccessToken,
  roleMiddleware.checkRoleAndGivePermission([ERoles.manager, ERoles.admin]),
  roleMiddleware.checkPermission,
  brandsMiddleware.isValidCreate,
  brandsController.create
);

router.put(
  "/:carBrandId",
  authMiddleware.checkAccessToken,
  roleMiddleware.checkRoleAndGivePermission([ERoles.manager, ERoles.admin]),
  roleMiddleware.checkPermission,
  brandsMiddleware.isIdValid,
  brandsMiddleware.getByIdOrThrow,
  brandsMiddleware.isValidUpdate,
  brandsController.update
);

router.delete(
  "/:carBrandId",
  authMiddleware.checkAccessToken,
  roleMiddleware.checkRoleAndGivePermission([ERoles.manager, ERoles.admin]),
  roleMiddleware.checkPermission,
  brandsMiddleware.isIdValid,
  brandsMiddleware.getByIdOrThrow,
  brandsController.delete
);

export const brandsRouter = router;
