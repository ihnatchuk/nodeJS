import * as Joi from "joi";

export class CarsListValidator {
  private static brand = Joi.string().min(2).max(50).trim();
  private static models = Joi.array().items(
    Joi.string().required().trim().min(1)
  );

  static createCarsListItem = Joi.object({
    brand: this.brand.required(),
    models: this.models,
  });
  static updateCarsListItem = Joi.object({
    brand: this.brand,
    models: this.models,
  });
}
