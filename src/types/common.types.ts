export interface IError extends Error {
  status: number;
}
interface IIndex {
  [key: string]: any;
}

export type IRequest = IIndex;

export interface ICredentials {
  email: string;
  password: string;
}
