import { NextFunction, Request, Response } from "express";

import { Brands } from "../models";
import { brandsService } from "../services";
import { IBrand, ICommonResponse } from "../types";

class BrandsController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IBrand[]>> {
    try {
      const carsList = await brandsService.getAll();
      return res.json(carsList);
    } catch (e) {
      next(e);
    }
  }
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<IBrand>>> {
    const body = req.body;
    try {
      const brand = await brandsService.create(body);
      return res.status(201).json({
        message: "Brand created!",
        data: brand,
      });
    } catch (e) {
      next(e);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IBrand>> {
    const { carBrandId } = req.params;
    try {
      const brandUpdated = await Brands.findByIdAndUpdate(
        carBrandId,
        req.body,
        {
          new: true,
        }
      );
      return res.status(201).json(brandUpdated);
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
      const { carBrandId } = req.params;
      await brandsService.delete(carBrandId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const brandsController = new BrandsController();
