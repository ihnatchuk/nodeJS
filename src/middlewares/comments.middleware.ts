import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors";
import { messagesService } from "../services";
import { CommentsValidator } from "../validators";

class CommentsMiddleware {
  public async isValidCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = CommentsValidator.createComment.validate(
        req.body
      );

      if (error) {
        throw new ApiError(error.message, 400);
      }
      value._user_id = res.locals.tokenInfo._user_id;
      value._car_id = res.locals.car._id;
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
      if (!isObjectIdOrHexString(req.params.messageId)) {
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
      const { messageId } = req.params;
      const message = await messagesService.getById(messageId);
      if (!message) {
        throw new ApiError("Message id not found", 422);
      }
      res.locals.message = message;
      next();
    } catch (e) {
      next(e);
    }
  }
}
export const commentsMiddleware = new CommentsMiddleware();
