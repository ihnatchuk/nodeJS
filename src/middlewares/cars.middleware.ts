import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { obsceneList } from "../constants";
import { ApiError } from "../errors";
import { Brands, CarSale } from "../models";
import { carsService } from "../services";
import { CarsValidator } from "../validators";

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
      const brand = await Brands.findOne({ brand: req.body.brand });
      if (!brand) {
        throw new ApiError("Brand not valid", 400);
      }
      const isModelValid = brand.models.some(
        (model) => model === req.body.model
      );
      if (!isModelValid) {
        throw new ApiError("Model not valid", 400);
      }
      value._user_id = res.locals.tokenInfo._user_id;
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
  public async isValidUpdateByAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = CarsValidator.updateCarByAdmin.validate(
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

  public async isFirstCarCreating(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userIdFromToken = res.locals.tokenInfo._user_id.toString();

      const user = await CarSale.findOne({ _user_id: userIdFromToken });
      const permitted = res.locals.permitted;
      if (user && !permitted) {
        throw new ApiError(
          `You must be a premiumSeller to sell more than one car`,
          402
        );
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
