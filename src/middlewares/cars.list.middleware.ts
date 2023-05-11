import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors";
import { carsListService } from "../services/cars.list.service";
import { CarsListValidator } from "../validators/cars.list.validator";

class CarsListMiddleware {
  public async isValidCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = CarsListValidator.createCarsListItem.validate(
        req.body
      );

      if (error) {
        throw new ApiError(error.message, 400);
      }
      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isValidUpdate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = CarsListValidator.updateCarsListItem.validate(
        req.body
      );

      if (error) {
        throw new ApiError(error.message, 400);
      }
      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isIdValid(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!isObjectIdOrHexString(req.params.carBrandId)) {
        throw new ApiError("Id is not valid", 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  public async getByIdOrThrow(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { carBrandId } = req.params;
      const carsListItem = await carsListService.getById(carBrandId);
      if (!carsListItem) {
        throw new ApiError("Brand id not found", 422);
      }
      res.locals.carsListItem = carsListItem;
      next();
    } catch (e) {
      next(e);
    }
  }
}
export const carsListMiddleware = new CarsListMiddleware();
