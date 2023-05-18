import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { activateAttemptsNumber } from "../constants";
import { carsService, statsService } from "../services";
import { ICarInfo, ICommonResponse } from "../types";

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
      console.log(carId, days, periodStart);

      const views = await statsService.getViews(carId, periodStart);
      return res.json(views);
    } catch (e) {
      next(e);
    }
  }
  public async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICarInfo>> {
    try {
      const { carId } = req.params;
      const car = await carsService.getById(carId);
      statsService.makeStats(carId);
      return res.json(car);
    } catch (e) {
      next(e);
    }
  }
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<ICarInfo>>> {
    const body = {
      ...req.body,
      active: false,
      activateAttempts: activateAttemptsNumber,
    };
    try {
      const carInfo = await carsService.create(body);
      return res.status(201).json({
        message: "Car for sale created!",
        data: carInfo,
      });
    } catch (e) {
      next(e);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICarInfo>> {
    const { carId } = req.params;
    const body = req.body;
    try {
      const { carInfo } = res.locals;
      const bodyUpdated = {
        ...body,
        ...carInfo,
        active: false,
      };
      const car = await carsService.update(carId, bodyUpdated);
      return res.status(201).json(car);
    } catch (e) {
      next(e);
    }
  }
  public async activate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICarInfo>> {
    try {
      const { carId } = req.params;
      const { carInfo } = res.locals;
      const bodyUpdated = { ...carInfo, active: true };
      const car = await carsService.update(carId, bodyUpdated);
      return res.status(201).json(car);
    } catch (e) {
      next(e);
    }
  }
  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { carId } = req.params;
      await carsService.delete(carId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async uploadPhotos(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const car = res.locals.car;

      const photos = req.files.photos as UploadedFile[];
      const carInfo = await carsService.uploadPhotos(photos, car);
      res.status(201).json(carInfo);
    } catch (e) {
      next(e);
    }
  }
}

export const statisticsController = new StatisticsController();
