import { NextFunction, Response } from "express";

import { ERoles } from "../enums";
import { ApiError } from "../errors";
import { IRequest } from "../types";

class RoleMiddleware {
  public checkPermission(req: IRequest, res: Response, next: NextFunction) {
    try {
      if (!res.locals.permitted) {
        throw new ApiError("No permission", 401);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  public checkRoleAndGivePermission(permittedRoles: ERoles[]) {
    return (req: IRequest, res: Response, next: NextFunction) => {
      try {
        const userRole = res.locals.tokenInfo.role;
        res.locals.permitted = permittedRoles.some((role) => userRole === role);
        next();
      } catch (e) {
        next(e);
      }
    };
  }
  public checkSetRole(req: IRequest, res: Response, next: NextFunction) {
    try {
      const { role: userRole } = res.locals.tokenInfo;
      const { role: setRole } = req.body;

      if (userRole === ERoles.admin) return next();
      if (setRole === ERoles.admin || setRole === ERoles.manager) {
        throw new ApiError("No permission to set this role", 401);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}
export const roleMiddleware = new RoleMiddleware();
