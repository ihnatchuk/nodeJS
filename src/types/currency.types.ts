import { Types } from "mongoose";

export interface ICurrency {
  _id?: Types.ObjectId;
  uah: number;
  eur: number;
}
export interface IPBCurrency {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
}
