import * as Joi from "joi";

import { EWhom } from "../enums/messages.enum";

export class MessagesValidator {
  private static whom = Joi.valid(...Object.values(EWhom));
  private static messageTheme = Joi.string().max(50).trim();
  private static messageText = Joi.string().max(250).trim();

  static createMessage = Joi.object({
    whom: this.whom.required(),
    messageTheme: this.messageTheme.required(),
    messageText: this.messageText.required(),
  });
}
