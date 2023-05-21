import { NextFunction, Request, Response } from "express";

import { commentsService } from "../services";
import { IComment, ICommonResponse } from "../types";

class CommentsController {
  public async getByCarId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IComment[]>> {
    try {
      const { carId } = req.params;
      const comments = await commentsService.getByCarId(carId);
      return res.json(comments);
    } catch (e) {
      next(e);
    }
  }
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<IComment>>> {
    const body = req.body;
    try {
      const comment = await commentsService.create(body);
      return res.status(201).json({
        message: "Message sent!",
        data: comment,
      });
    } catch (e) {
      next(e);
    }
  }
}

export const commentsController = new CommentsController();
