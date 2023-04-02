import * as Joi from "joi";

import { regexConstants } from "../constants";
import { EGenders } from "../enums";
export class UserValidator {
  private static firstName = Joi.string().min(2).max(50).trim();
  private static email = Joi.string()
    .regex(regexConstants.EMAIL)
    .max(50)
    .lowercase()
    .trim();
  private static password = Joi.string().regex(regexConstants.PASSWORD);
  private static gender = Joi.valid(...Object.values(EGenders));
  private static age = Joi.number().min(1);
  private static phone = Joi.string().regex(regexConstants.PHONE);

  static createUser = Joi.object({
    name: this.firstName.required(),
    email: this.email.required(),
    password: this.password.required(),
    age: this.age,
    gender: this.gender.required(),
    phone: this.phone.required(),
  });
  static updateUser = Joi.object({
    name: this.firstName,
    age: this.age,
    gender: this.gender,
    phone: this.phone,
  });
  static loginUser = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
}
