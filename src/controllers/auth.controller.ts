import { NextFunction, Request, Response } from "express";

import { Token } from "../models";
import { authService } from "../services";
import { ITokenPayload, IUser } from "../types";

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
        role: user.role,
        ...tokenPair,
      });
      res.json(tokenPair).status(200);
    } catch (e) {
      next(e);
    }
  }
  public async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { tokenInfo } = req.res.locals;
      const { oldPassword, newPassword } = req.body;

      await authService.changePassword(
        tokenInfo._user_id,
        oldPassword,
        newPassword
      );

      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }

  public async forgotPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { user } = req.res.locals;
      await authService.forgotPassword(user);

      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }

  public async setForgotPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { password } = req.body;
      const { tokenInfo } = req.res.locals;

      await authService.setForgotPassword(
        password,
        tokenInfo._user_id,
        req.params.token
      );

      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }

  public async sendActivateToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { user } = req.res.locals;
      await authService.sendActivateToken(user);

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async activate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { _id } = req.res.locals.jwtPayload as ITokenPayload;
      await authService.activate(_id);

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}
export const authController = new AuthController();
