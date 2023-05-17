import { takeCurrencyCron } from "./take.currency.cron";

export const cronRunner = () => {
  takeCurrencyCron.start();
};
