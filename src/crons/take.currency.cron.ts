import { CronJob } from "cron";

import { Currency } from "../models";
import { IPBCurrency } from "../types";

const takeCurrency = async (): Promise<void> => {
  let xChange: IPBCurrency[] = [];
  const getCurrency = async () => {
    await fetch(
      `https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`
    )
      .then((response) => response.json())
      .then((data) => (xChange = [...data]));
  };
  await getCurrency();
  const uah = +xChange[1].buy;
  const eur = +xChange[1].buy / +xChange[0].buy;
  const currency = { uah, eur };
  await Currency.create(currency);
};

export const takeCurrencyCron = new CronJob("0 5 * * *", takeCurrency);
