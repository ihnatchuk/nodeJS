import { Router } from "express";

import { currencyController } from "../controllers/currency.controller";

const router = Router();

router.get("/", currencyController.getToday);

export const currencyRouter = router;
