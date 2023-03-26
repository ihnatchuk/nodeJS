export enum EGenders {
  // eslint-disable-next-line no-unused-vars
  male = "male",
  // eslint-disable-next-line no-unused-vars
  female = "female",
  // eslint-disable-next-line no-unused-vars
  mixed = "mixed",
}

export interface IUser {
  _id?: string;
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
}
export interface ICommonResponse<T> {
  message: string;
  data: T;
}
