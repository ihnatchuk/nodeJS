import { UploadedFile } from "express-fileupload";

import { ApiError } from "../errors";
import { User } from "../models";
import { IUser } from "../types";
import { s3Service } from "./s3.service";

class UserService {
  public async getAll(): Promise<IUser[]> {
    try {
      return User.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getById(id: string): Promise<IUser> {
    try {
      return User.findById(id);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async uploadAvatar(
    file: UploadedFile,
    userId: string
  ): Promise<IUser> {
    try {
      const filePath = await s3Service.uploadPhoto(file, "user", userId);
      return await User.findByIdAndUpdate(
        userId,
        { avatar: filePath },
        { new: true }
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const userService = new UserService();
