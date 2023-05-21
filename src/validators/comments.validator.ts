import * as Joi from "joi";

export class CommentsValidator {
  private static comment = Joi.string().max(250).trim();

  static createComment = Joi.object({
    comment: this.comment.required(),
  });
}
