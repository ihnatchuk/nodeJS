import { NextFunction, Request, Response } from "express";

import { Token } from "../models";
import { authService } from "../services";
import { IUser } from "../types";

class AuthController {
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.register(res.locals.body);
      res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }
  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = req.res.locals;
      const tokenPair = await authService.login(
        { email, password },
        user as IUser
      );
      await Token.create({
        _user_id: user._id,
        role: user.role || "unknown",
        ...tokenPair,
      });
      res.json(tokenPair).status(200);
    } catch (e) {
      next(e);
    }
  }
}
export const authController = new AuthController();
