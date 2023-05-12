import * as Joi from "joi";

import { EBodyType, EFuel } from "../enums";
import { ECurrency } from "../enums";

export class CarsValidator {
  private static _user_id = Joi.string().required();
  private static brand = Joi.string().min(2).max(50).trim().required();
  private static model = Joi.string().trim().min(1).max(50).required();
  private static year = Joi.number()
    .min(1970)
    .max(new Date().getFullYear())
    .required();
  private static price = Joi.number().min(1).required();
  private static currency = Joi.valid(...Object.values(ECurrency));
  private static fuel = Joi.valid(...Object.values(EFuel));
  private static bodyType = Joi.valid(...Object.values(EBodyType));
  private static engineVolume = Joi.number().min(500).max(10000);
  private static doors = Joi.number().min(2).max(5);
  private static mileage = Joi.number().min(0);
  private static seats = Joi.number().min(2).max(54);
  private static color = Joi.string().trim().min(4);
  private static location = Joi.string().trim().min(4).max(100);
  private static features = Joi.array().items(Joi.string());
  private static description = Joi.string().trim().min(40).max(250);
  private static photos = Joi.array().items(Joi.string().uri());

  static createCar = Joi.object({
    _user_id: this._user_id.required(),
    brand: this.brand.required(),
    model: this.model.required(),
    year: this.year.required(),
    price: this.price.required(),
    currency: this.currency.required(),
    fuel: this.fuel,
    bodyType: this.bodyType,
    engineVolume: this.engineVolume,
    doors: this.doors,
    mileage: this.mileage,
    seats: this.seats,
    color: this.color,
    location: this.location,
    features: this.features,
    description: this.description,
    photos: this.photos,
  });
  static updateCar = Joi.object({
    brand: this.brand,
    model: this.model,
    year: this.year,
    price: this.price,
    currency: this.currency,
    fuel: this.fuel,
    bodyType: this.bodyType,
    engineVolume: this.engineVolume,
    doors: this.doors,
    mileage: this.mileage,
    seats: this.seats,
    color: this.color,
    location: this.location,
    features: this.features,
    description: this.description,
    photos: this.photos,
  });
}
