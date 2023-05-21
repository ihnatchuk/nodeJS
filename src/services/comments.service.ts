import { ApiError } from "../errors";
import { Comments } from "../models";
import { IComment } from "../types";

class CommentsService {
  public async getByCarId(id: string): Promise<IComment[]> {
    try {
      return Comments.find({ _car_id: id });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async create(body: IComment): Promise<void> {
    try {
      await Comments.create(body);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const commentsService = new CommentsService();
