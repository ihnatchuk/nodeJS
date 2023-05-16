import { EStats } from "../enums/stats.enum";
import { ApiError } from "../errors";
import { Stats } from "../models/stats.model";

class StatsService {
  public makeStats(id: string): void {
    try {
      Stats.create({ _car_id: id, action: EStats.visit });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const statsService = new StatsService();
