import { ECurrency, EStats } from "../enums";
import { ApiError } from "../errors";
import { CarSale, Stats } from "../models";
import { ICarInfo, IPrice } from "../types";
import { currencyService } from "./currency.service";

class StatsService {
  public makeStats(id: string): void {
    try {
      Stats.create({ _car_id: id, action: EStats.visit });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async getViews(carId: string, periodStart: Date): Promise<number> {
    try {
      return await Stats.countDocuments({
        _car_id: carId,
        action: EStats.visit,
        createdAt: { $gt: periodStart },
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async getRegionPrices(car: ICarInfo): Promise<IPrice[]> {
    try {
      const { brand, model, year, location } = car;
      return await CarSale.find(
        {
          brand,
          model,
          year,
          location,
          active: true,
        },
        {
          _id: 0,
          price: 1,
          currency: 1,
        }
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async getAllRegionsPrices(car: ICarInfo): Promise<ICarInfo[]> {
    try {
      const { brand, model, year } = car;
      return await CarSale.find({
        brand,
        model,
        year,
        active: true,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async getAveragePrice(prices: IPrice[]): Promise<number> {
    try {
      const Xchange = await currencyService.getCurrency();

      if (!prices.length) return 0;

      const priceArray = prices.map((price) => {
        let priceUSD = 0;
        switch (price.currency) {
          case ECurrency.uah:
            priceUSD = price.price / Xchange.uah;
            break;
          case ECurrency.usd:
            priceUSD = price.price;
            break;
          case ECurrency.eur:
            priceUSD = price.price / Xchange.eur;
            break;
        }
        return priceUSD;
      });
      return Math.round(priceArray.reduce((a, b) => a + b) / priceArray.length);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const statsService = new StatsService();
