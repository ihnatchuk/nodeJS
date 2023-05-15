import { ApiError } from "../errors";
import { Brands } from "../models";
import { IBrand } from "../types";

class BrandsService {
  public async getAll(): Promise<IBrand[]> {
    try {
      return Brands.find().sort("brand");
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(body: IBrand): Promise<void> {
    try {
      await Brands.create(body);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getById(id: string): Promise<IBrand> {
    try {
      return Brands.findById(id);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await Brands.findByIdAndDelete(id);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const brandsService = new BrandsService();
