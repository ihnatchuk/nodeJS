import { NextFunction, Request, Response } from "express";

import { Currency } from "../models";
import { ICurrency } from "../types/currency.types";

class CurrencyController {
  public async getToday(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICurrency>> {
    try {
      const currency = await Currency.find()
        .sort({ createdAt: "desc" })
        .limit(1);
      return res.json(currency);
    } catch (e) {
      next(e);
    }
  }
}

export const currencyController = new CurrencyController();
