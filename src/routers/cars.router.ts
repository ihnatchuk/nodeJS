import { Router } from "express";

import { carsController } from "../controllers/cars.controller";
import { ERoles } from "../enums";
import { authMiddleware, carsMiddleware, roleMiddleware } from "../middlewares";

const router = Router();

router.get("/", carsController.getAll);

router.get(
  "/:carId",
  carsMiddleware.isIdValid,
  carsMiddleware.getByIdOrThrow,
  carsController.getById
);

router.post(
  "/",
  authMiddleware.checkAccessToken,
  roleMiddleware.checkRoleAndGivePermission([ERoles.seller]),
  roleMiddleware.checkPermission,
  carsMiddleware.isValidCreate,
  carsMiddleware.getByUserIdOrThrow,
  carsMiddleware.checkUserId,
  carsMiddleware.getDynamicallyAndThrow("_user_id", "body"),
  carsController.create
);

router.post(
  "/create",
  authMiddleware.checkAccessToken,
  roleMiddleware.checkRoleAndGivePermission([
    ERoles.premiumSeller,
    ERoles.manager,
    ERoles.admin,
  ]),
  roleMiddleware.checkPermission,
  carsMiddleware.isValidCreate,
  carsMiddleware.getByUserIdOrThrow,
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
  "/update/:carId",
  authMiddleware.checkAccessToken,
  roleMiddleware.checkRoleAndGivePermission([ERoles.manager, ERoles.admin]),
  roleMiddleware.checkPermission,
  carsMiddleware.isIdValid,
  carsMiddleware.isValidUpdate,
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
export const carsRouter = router;
