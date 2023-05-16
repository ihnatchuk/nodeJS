import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { obsceneList } from "../constants";
import { ApiError } from "../errors";
import { CarSale } from "../models/cars.sale.model";
import { carsService, userService } from "../services";
import { IRequest } from "../types";
import { CarsValidator } from "../validators/cars.validator";

class CarsMiddleware {
  public async isValidCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = CarsValidator.createCar.validate(req.body);

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
      const { error, value } = CarsValidator.updateCar.validate(req.body);

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
      if (!isObjectIdOrHexString(req.params.carId)) {
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
      const { carId } = req.params;
      const carInfo = await carsService.getById(carId);
      if (!carInfo) {
        throw new ApiError("Car id not found", 422);
      }
      res.locals.car = carInfo;
      next();
    } catch (e) {
      next(e);
    }
  }
  public async getByUserIdOrThrow(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { _user_id: userId } = req.body;
      if (!isObjectIdOrHexString(userId)) {
        throw new ApiError("UserId is not valid", 400);
      }
      const user = await userService.getById(userId);
      if (!user) {
        throw new ApiError("User id not found", 422);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  public getDynamicallyAndThrow(
    fieldname: string,
    from = "body",
    dbField = fieldname
  ) {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      try {
        const fieldValue = req[from][fieldname];

        const user = await CarSale.findOne({ [dbField]: fieldValue });

        if (user) {
          throw new ApiError(
            `User with ${fieldname} ${fieldValue} already have one car to sale`,
            409
          );
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
  public async checkUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userIdFromToken = res.locals.tokenInfo._user_id.toString();
      const userIdFromBody = req.body._user_id.toString();
      if (userIdFromToken !== userIdFromBody) {
        throw new ApiError("No permission to create car for other user", 422);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  public async checkCarOwner(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userIdFromToken = res.locals.tokenInfo._user_id.toString();
      const userIdFromCarInfo = res.locals.car._user_id.toString();
      if (userIdFromToken !== userIdFromCarInfo) {
        throw new ApiError("No permission. It is not your car", 422);
      }
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkCarDescription(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { description } = res.locals.car;
      if (!description) {
        throw new ApiError("Refused!!! Description required", 422);
      }
      const isNotPermitted = obsceneList.some((word) =>
        description.toLowerCase().includes(word)
      );
      if (isNotPermitted) {
        throw new ApiError(
          "Refused!!! Description contains obscene words",
          422
        );
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  public async checkActivateAttempts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { carId } = req.params;
      const { car } = res.locals;
      const { activateAttempts: attemptsNumber } = car;
      if (!attemptsNumber) {
        throw new ApiError(
          "There 0 attempts to activate left, you should email to admin to activate your ad",
          422
        );
      }
      car.activateAttempts = attemptsNumber - 1;
      await carsService.update(carId, car);
      next();
    } catch (e) {
      next(e);
    }
  }
}
export const carsMiddleware = new CarsMiddleware();
