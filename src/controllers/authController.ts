import { NextFunction, Request, Response } from "express";

import { Token } from "../models/Token.model";
import { authService } from "../services/authService";
import { IUser } from "../types";

class AuthController {
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.register(req.body);
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
        _id: user._id,
        ...tokenPair,
      });
      res.json(tokenPair).status(200);
    } catch (e) {
      next(e);
    }
  }
}
export const authController = new AuthController();
