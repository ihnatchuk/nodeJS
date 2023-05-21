import { ApiError } from "../errors";
import { Messages } from "../models";
import { IMessage } from "../types";

class MessagesService {
  public async getAll(): Promise<IMessage[]> {
    try {
      return Messages.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async getMy(_user_id: string): Promise<IMessage[]> {
    try {
      return Messages.find({ _user_id });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async getById(id: string): Promise<IMessage[]> {
    try {
      return Messages.findById(id);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async create(body: IMessage): Promise<void> {
    try {
      await Messages.create(body);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async delete(id: string): Promise<void> {
    try {
      await Messages.findByIdAndDelete(id);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const messagesService = new MessagesService();
