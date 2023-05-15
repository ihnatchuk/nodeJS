import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { Brands } from "../models";
import { brandsService, userService } from "../services";
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
      const carsListItem = await brandsService.create(body);
      return res.status(201).json({
        message: "Cars list item created!",
        data: carsListItem,
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
    const body = req.body;
    try {
      const { carsListItem } = res.locals;
      body.models = [...carsListItem.models, ...body.models];
      const carListItemRes = await Brands.findByIdAndUpdate(carBrandId, body, {
        new: true,
      });
      return res.status(201).json(carListItemRes);
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

export const brandsController = new BrandsController();
