export interface IUser {
  _id?: string;
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  role: string;
  avatar?: string;
}
export interface ICommonResponse<T> {
  message: string;
  data: T;
}
