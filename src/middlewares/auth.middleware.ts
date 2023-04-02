import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { Token } from "../models";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const accessToken = req.get("Authorization");

      if (!accessToken) throw new ApiError("No token", 401);

      const tokenInfo = await Token.findOne({ accessToken });

      if (!tokenInfo) {
        throw new ApiError("Token is not valid", 401);
      }
      res.locals = { tokenInfo };
      next();
    } catch (e) {
      next(e);
    }
  }
  public async chekRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const refreshToken = req.get("Authorization");

      if (!refreshToken) throw new ApiError("No token", 401);

      const tokenInfo = await Token.findOne({ refreshToken });

      if (!refreshToken) {
        throw new ApiError("Token is not valid", 401);
      }
      // tokenService.generateTokenPair();
      res.locals = { tokenInfo };
      next();
    } catch (e) {
      next(e);
    }
  }
}
export const authMiddleware = new AuthMiddleware();
