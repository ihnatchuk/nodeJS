import { Router } from "express";

import { brandsController } from "../controllers/brands.controller";
import { brandsMiddleware } from "../middlewares";
// import { authMiddleware } from "../middlewares";

const router = Router();

router.get("/", brandsController.getAll);

router.post(
  "/",
  // authMiddleware.checkAccessToken,
  brandsMiddleware.isValidCreate,
  brandsController.create
);

router.put(
  "/:carBrandId",
  // authMiddleware.checkAccessToken,
  brandsMiddleware.isIdValid,
  brandsMiddleware.isValidUpdate,
  brandsMiddleware.getByIdOrThrow,
  brandsController.update
);

router.delete(
  "/:carBrandId",
  // authMiddleware.checkAccessToken,
  brandsMiddleware.isIdValid,
  brandsMiddleware.getByIdOrThrow,
  brandsController.delete
);

export const brandsRouter = router;
