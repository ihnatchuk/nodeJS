import * as Joi from "joi";

import { EBodyType, ECurrency, EFuel, ERegions } from "../enums";

export class CarsValidator {
  private static brand = Joi.string().min(2).max(50).trim();
  private static model = Joi.string().trim().min(1).max(50);
  private static year = Joi.number().min(1970).max(new Date().getFullYear());
  private static price = Joi.number().min(1);
  private static currency = Joi.valid(...Object.values(ECurrency));
  private static fuel = Joi.valid(...Object.values(EFuel));
  private static bodyType = Joi.valid(...Object.values(EBodyType));
  private static engineVolume = Joi.number().min(0.5).max(10);
  private static doors = Joi.number().min(2).max(5);
  private static mileage = Joi.number().min(0);
  private static seats = Joi.number().min(2).max(54);
  private static color = Joi.string().trim().min(4);
  private static location = Joi.valid(...Object.values(ERegions));
  private static features = Joi.array().items(Joi.string());
  private static description = Joi.string().trim().min(40).max(250);
  private static photos = Joi.array().items(Joi.string().uri());
  private static activateAttempts = Joi.number().max(3);

  static createCar = Joi.object({
    brand: this.brand.required(),
    model: this.model.required(),
    year: this.year.required(),
    price: this.price.required(),
    currency: this.currency.required(),
    location: this.location.required(),
    description: this.description.required(),
    fuel: this.fuel,
    bodyType: this.bodyType,
    engineVolume: this.engineVolume,
    doors: this.doors,
    mileage: this.mileage,
    seats: this.seats,
    color: this.color,
    features: this.features,
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
  static updateCarByAdmin = Joi.object({
    activateAttempts: this.activateAttempts,
  });
}
