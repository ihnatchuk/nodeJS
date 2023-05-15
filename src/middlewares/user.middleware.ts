import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ERoles } from "../enums";
import { ApiError } from "../errors";
import { User } from "../models";
import { userService } from "../services";
import { IRequest } from "../types";
import { UserValidator } from "../validators";

class UserMiddleware {
  public async getByIdOrThrow(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await userService.getById(userId);
      if (!user) {
        throw new ApiError("User not found", 422);
      }
      res.locals.user = user;
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

        const user = await User.findOne({ [dbField]: fieldValue });

        if (user) {
          throw new ApiError(
            `User with ${fieldname} ${fieldValue} already exists`,
            409
          );
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
  public getDynamicallyorThrow(
    fieldname: string,
    from = "body",
    dbField = fieldname
  ) {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      try {
        const fieldValue = req[from][fieldname];

        const user = await User.findOne({ [dbField]: fieldValue });

        if (!user) {
          throw new ApiError(
            `User with ${fieldname} ${fieldValue} not found`,
            409
          );
        }
        req.res.locals = user;
        next();
      } catch (e) {
        next(e);
      }
    };
  }
  public async isValidCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = UserValidator.createUser.validate(req.body);

      if (error) {
        throw new ApiError(error.message, 400);
      }
      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }
  public async isValidCreateByMngr(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = UserValidator.createUserByMngr.validate(
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
      const { error, value } = UserValidator.updateUser.validate(req.body);

      if (error) {
        throw new ApiError(error.message, 400);
      }
      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }
  public async isValidUpdateByMngr(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = UserValidator.updateUserByMngr.validate(
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
  public async isValidLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error } = UserValidator.loginUser.validate(req.body);

      if (error) {
        throw new ApiError(error.message, 400);
      }
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
      if (!isObjectIdOrHexString(req.params.userId)) {
        throw new ApiError("Id is not valid", 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  public setRole(role: ERoles) {
    return (req: IRequest, res: Response, next: NextFunction) => {
      try {
        const { body } = req;
        body.role = role;
        req.res.locals.body = body;
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
      const userIdFromToken = res.locals.tokenInfo._user_id;
      const userIdToUpdate = res.locals.user._id;
      if (userIdFromToken !== userIdToUpdate) {
        throw new ApiError("No permission", 422);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}
export const userMiddleware = new UserMiddleware();
