import { NextFunction, Request, Response } from "express";

import { photoConfig } from "../configs";
import { ApiError } from "../errors";

class FileMiddleware {
  public isPhotoValid(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.files) {
        throw new ApiError("No files to upload", 400);
      }
      const photos = Array.isArray(req.files.photos)
        ? req.files.photos
        : [req.files.photos];
      // Check if photos fit requirements
      photos.forEach((photo) => {
        const { size, mimetype, name } = photo;

        if (size > photoConfig.MAX_SIZE) {
          throw new ApiError(`File ${name} is too big.`, 400);
        }
        if (!photoConfig.MIMETYPES.includes(mimetype)) {
          throw new ApiError(`File ${name} has invalid format`, 400);
        }
      });
      req.files.photos = photos;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const fileMiddleware = new FileMiddleware();
