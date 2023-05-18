import { EStats } from "../enums/stats.enum";
import { ApiError } from "../errors";
import { Stats } from "../models/stats.model";
// import { IViews } from "../types";

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
      // const views = await Stats.aggregate([
      //   {
      //     $match: {
      //       _car_id: carId,
      //       action: EStats.visit,
      //       createdAt: { $gt: periodStart },
      //     },
      //   },
      //   {
      //     $count: "amount",
      //   },
      // ]);
      const views = await Stats.find({
        _car_id: carId,
        action: EStats.visit,
        createdAt: { $gt: periodStart },
      });
      console.log(views);
      return views.length;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const statsService = new StatsService();
