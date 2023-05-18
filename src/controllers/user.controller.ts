import { NextFunction, Request, Response } from "express";

import { User } from "../models";
import { passwordService, userService } from "../services";
import { ICommonResponse, IUser } from "../types";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.getAll();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
  public async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { user } = req.res.locals;
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<IUser>>> {
    const body = req.body;
    try {
      const user = await User.create(body);
      return res.status(201).json({
        message: "User created!",
        data: user,
      });
    } catch (e) {
      next(e);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    const { userId } = req.params;
    let body = req.body;
    try {
      const { password } = body;
      if (password) {
        const hashedPassword = await passwordService.hash(password);
        body = { ...body, password: hashedPassword };
      }
      const user = await User.findByIdAndUpdate(userId, body, {
        new: true,
      });
      return res.status(201).json(user);
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
      const { userId } = req.params;
      await User.deleteOne({ _id: userId });
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
