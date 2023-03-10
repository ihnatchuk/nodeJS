import { Router } from "express";

import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/", userController.getAll);

router.get("/:userId", userController.getById);

router.post("/", userController.create);

router.delete("/:userId", userController.delete);

router.put("/:userId", userController.update);

export const userRouter = router;
