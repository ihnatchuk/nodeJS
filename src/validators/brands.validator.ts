import * as Joi from "joi";

export class BrandsValidator {
  private static brand = Joi.string().min(2).max(50).trim();
  private static models = Joi.array().items(
    Joi.string().required().trim().min(1)
  );

  static createBrand = Joi.object({
    brand: this.brand.required(),
    models: this.models,
  });
  static updateBrand = Joi.object({
    brand: this.brand,
    models: this.models,
  });
}
