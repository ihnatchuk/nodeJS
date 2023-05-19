import { NextFunction, Request, Response } from "express";

import { currencyService } from "../services";
import { ICurrency } from "../types";

class CurrencyController {
  public async getToday(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICurrency>> {
    try {
      const currency = await currencyService.getCurrency();
      return res.json(currency);
    } catch (e) {
      next(e);
    }
  }
}

export const currencyController = new CurrencyController();
