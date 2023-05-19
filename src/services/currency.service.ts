import { ApiError } from "../errors";
import { Currency } from "../models";
import { ICurrency } from "../types";

class CurrencyService {
  public async getCurrency(): Promise<ICurrency> {
    try {
      const currency = await Currency.find()
        .sort({ createdAt: "desc" })
        .limit(1);
      return currency[0];
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const currencyService = new CurrencyService();
