import { NextFunction, Request, Response } from "express";

import { messagesService } from "../services";
import { ICommonResponse, IMessage } from "../types";

class MessagesController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IMessage[]>> {
    try {
      const messages = await messagesService.getAll();
      return res.json(messages);
    } catch (e) {
      next(e);
    }
  }
  public async getMy(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IMessage[]>> {
    try {
      const messages = await messagesService.getMy(
        res.locals.tokenInfo._user_id
      );
      return res.json(messages);
    } catch (e) {
      next(e);
    }
  }
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<IMessage>>> {
    const body = req.body;
    try {
      const message = await messagesService.create(body);
      return res.status(201).json({
        message: "Message sent!",
        data: message,
      });
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
      const { messageId } = req.params;
      await messagesService.delete(messageId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const messagesController = new MessagesController();
