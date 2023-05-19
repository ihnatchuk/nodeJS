import { NextFunction, Request, Response } from "express";

import { statsService } from "../services";
import { ICarInfo } from "../types";

class StatisticsController {
  public async getViews(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICarInfo[]>> {
    try {
      const { carId, days } = req.params;
      const periodStart = new Date();
      periodStart.setDate(periodStart.getDate() - +days);
      periodStart.setHours(0, 0, 0, 0);

      const views = await statsService.getViews(carId, periodStart);
      return res.json(views);
    } catch (e) {
      next(e);
    }
  }
  public async getRegionAveragePrice(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { car } = res.locals;

      const prices = await statsService.getRegionPrices(car);
      const averagePrice = await statsService.getAveragePrice(prices);
      res.json(averagePrice);
    } catch (e) {
      next(e);
    }
  }
  public async getAveragePrice(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { car } = res.locals;

      const prices = await statsService.getAllRegionsPrices(car);
      const averagePrice = await statsService.getAveragePrice(prices);
      res.json(averagePrice);
    } catch (e) {
      next(e);
    }
  }
}

export const statisticsController = new StatisticsController();
