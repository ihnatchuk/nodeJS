import jwt from "jsonwebtoken";

import { ITokenPair, ITokenPayload } from "../types";
class TokenService {
  public generateTokenPair(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, "JWT_ACCESS_SECRET", {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, "JWT_REFRESH_SECRET", {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }
}
export const tokenService = new TokenService();
