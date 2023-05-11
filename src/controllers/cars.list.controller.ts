import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { CarsList } from "../models";
import { userService } from "../services";
import { carsListService } from "../services/cars.list.service";
import { ICommonResponse } from "../types";
import { ICarsListItem } from "../types";

class CarsListController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICarsListItem[]>> {
    try {
      const carsList = await carsListService.getAll();
      return res.json(carsList);
    } catch (e) {
      next(e);
    }
  }
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<ICarsListItem>>> {
    const body = req.body;
    try {
      const carsListItem = await carsListService.create(body);
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
  ): Promise<Response<ICarsListItem>> {
    const { carBrandId } = req.params;
    const body = req.body;
    try {
      const { carsListItem } = res.locals;
      body.models = [...carsListItem.models, ...body.models];
      const carListItemRes = await CarsList.findByIdAndUpdate(
        carBrandId,
        body,
        {
          new: true,
        }
      );
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
      await carsListService.delete(carBrandId);
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

export const carsListController = new CarsListController();
