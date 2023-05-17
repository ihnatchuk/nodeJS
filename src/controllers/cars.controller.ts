import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { activateAttemptsNumber } from "../constants";
import { carsService, statsService, userService } from "../services";
import { ICarInfo, ICommonResponse } from "../types";

class CarsController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICarInfo[]>> {
    try {
      const cars = await carsService.getAll();
      return res.json(cars);
    } catch (e) {
      next(e);
    }
  }
  public async getAllActivated(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICarInfo[]>> {
    try {
      const cars = await carsService.getAllActivated();
      return res.json(cars);
    } catch (e) {
      next(e);
    }
  }
  public async getMyCars(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICarInfo[]>> {
    try {
      const { _user_id: userId } = res.locals.tokenInfo;
      const cars = await carsService.getMyCars(userId);
      return res.json(cars);
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
  public async uploadAvatar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;

      const avatar = req.files.avatar as UploadedFile;
      console.log(req.files);
      const user = await userService.uploadAvatar(avatar, userId);
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }
}

export const carsController = new CarsController();
