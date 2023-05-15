import { NextFunction, Response } from "express";

import { ERoles } from "../enums";
import { ApiError } from "../errors";
import { IRequest } from "../types";

class RoleMiddleware {
  public checkRole(roleToCheck: ERoles) {
    return (req: IRequest, res: Response, next: NextFunction) => {
      try {
        const role = res.locals.tokenInfo.role;

        if (role !== roleToCheck) {
          throw new ApiError("No permission", 401);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
  // public async checkRole(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   try {
  //     const role = res.locals.tokenInfo.role;
  //
  //     if (role !== ERoles.manager) {
  //       throw new ApiError("No permission", 401);
  //     }
  //     next();
  //   } catch (e) {
  //     next(e);
  //   }
  // }
}
export const roleMiddleware = new RoleMiddleware();
