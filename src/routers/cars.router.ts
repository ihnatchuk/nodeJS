import { Router } from "express";

import { carsController } from "../controllers";
import { ERoles } from "../enums";
import {
  authMiddleware,
  carsMiddleware,
  fileMiddleware,
  roleMiddleware,
} from "../middlewares";

const router = Router();

router.get("/", carsController.getAllActivated);

router.get(
  "/all",
  authMiddleware.checkAccessToken,
  roleMiddleware.checkRoleAndGivePermission([ERoles.manager, ERoles.admin]),
  roleMiddleware.checkPermission,
  carsController.getAll
);
router.get("/my", authMiddleware.checkAccessToken, carsController.getMyCars);

router.get(
  "/:carId",
  carsMiddleware.isIdValid,
  carsMiddleware.getByIdOrThrow,
  carsController.getById
);

router.post(
  "/",
  authMiddleware.checkAccessToken,
  roleMiddleware.checkRoleAndGivePermission([
    ERoles.premiumSeller,
    ERoles.manager,
    ERoles.admin,
  ]),
  carsMiddleware.isValidCreate,
  carsMiddleware.isFirstCarCreating,
  carsController.create
);

router.put(
  "/:carId",
  authMiddleware.checkAccessToken,
  carsMiddleware.isIdValid,
  carsMiddleware.isValidUpdate,
  carsMiddleware.getByIdOrThrow,
  carsMiddleware.checkCarOwner,
  carsController.update
);

router.put(
  "/allow-to-activate/:carId",
  authMiddleware.checkAccessToken,
  roleMiddleware.checkRoleAndGivePermission([ERoles.manager, ERoles.admin]),
  roleMiddleware.checkPermission,
  carsMiddleware.isIdValid,
  carsMiddleware.isValidUpdateByAdmin,
  carsMiddleware.getByIdOrThrow,
  carsController.update
);

router.delete(
  "/:carId",
  authMiddleware.checkAccessToken,
  carsMiddleware.isIdValid,
  carsMiddleware.getByIdOrThrow,
  carsMiddleware.checkCarOwner,
  carsController.delete
);
router.delete(
  "/delete/:carId",
  authMiddleware.checkAccessToken,
  roleMiddleware.checkRoleAndGivePermission([ERoles.manager, ERoles.admin]),
  roleMiddleware.checkPermission,
  carsMiddleware.isIdValid,
  carsMiddleware.getByIdOrThrow,
  carsController.delete
);

router.put(
  "/activate/:carId",
  authMiddleware.checkAccessToken,
  carsMiddleware.isIdValid,
  carsMiddleware.getByIdOrThrow,
  carsMiddleware.checkCarOwner,
  carsMiddleware.checkActivateAttempts,
  carsMiddleware.checkCarDescription,
  carsController.activate
);

router.put(
  "/:carId/photos",
  authMiddleware.checkAccessToken,
  carsMiddleware.isIdValid,
  fileMiddleware.isPhotoValid,
  carsMiddleware.getByIdOrThrow,
  carsController.uploadPhotos
);

export const carsRouter = router;
