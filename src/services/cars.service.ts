import { ApiError } from "../errors";
import { CarSale } from "../models/cars.sale.model";
import { ICarInfo, ICarsListItem } from "../types";

class CarsService {
  public async getAll(): Promise<ICarInfo[]> {
    try {
      return CarSale.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(body: ICarsListItem): Promise<void> {
    try {
      await CarSale.create(body);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getById(id: string): Promise<ICarInfo> {
    try {
      return CarSale.findById(id);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await CarSale.findByIdAndDelete(id);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const carsService = new CarsService();
