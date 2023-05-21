import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors";
import { brandsService } from "../services";
import { BrandsValidator } from "../validators";

class BrandsMiddleware {
  public async isValidCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = BrandsValidator.createBrand.validate(req.body);

      if (error) {
        throw new ApiError(error.message, 400);
      }
      const modelsList = new Set(value.models);
      const modelsArr = [...modelsList].sort((a: string, b: string) => {
        if (a > b) return 1;
        if (a <= b) return -1;
      });
      value.models = [...modelsArr];
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
      const { error, value } = BrandsValidator.updateBrand.validate(req.body);

      if (error) {
        throw new ApiError(error.message, 400);
      }
      const modelsList = new Set(value.models.concat(res.locals.brand.models));
      const modelsArr = [...modelsList].sort((a: string, b: string) => {
        if (a > b) return 1;
        if (a <= b) return -1;
      });
      value.models = [...modelsArr];
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
      const brand = await brandsService.getById(carBrandId);
      if (!brand) {
        throw new ApiError("Brand id not found", 422);
      }
      res.locals.brand = brand;
      next();
    } catch (e) {
      next(e);
    }
  }
}
export const brandsMiddleware = new BrandsMiddleware();
