import { NextFunction, Request, Response } from "express";

import { User } from "../models/user.model";
import { ICommonResponse, IUser } from "../types/user.types";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser[]>> {
    try {
      const users = await User.find();
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
      const { userId } = req.params;
      const user: IUser = await User.findById(userId);
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
      // return res.status(400).send(e.message);
      next(e);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<IUser>>> {
    const { userId } = req.params;
    const body = req.body;
    try {
      const user = await User.updateOne({ _id: userId }, body);
      return res.status(201).json({
        message: "User updated!",
        data: user,
      });
    } catch (e) {
      next(e);
      // return res.status(400).send(e.message);
    }
  }
  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { userId } = req.params;
      await User.deleteOne({ _id: userId });
      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
