import { ApiError } from "../errors";
import { CarsList } from "../models";
import { ICarsListItem } from "../types";

class CarsListService {
  public async getAll(): Promise<ICarsListItem[]> {
    try {
      return CarsList.find().sort("brand");
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(body: ICarsListItem): Promise<void> {
    try {
      await CarsList.create(body);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getById(id: string): Promise<ICarsListItem> {
    try {
      return CarsList.findById(id);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await CarsList.findByIdAndDelete(id);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const carsListService = new CarsListService();
