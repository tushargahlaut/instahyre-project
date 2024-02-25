import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { RegisteredUserInt } from "../interfaces/registereduser.interface";
import { JWTInterface } from "../interfaces/jwtpayload.interface";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET as string;

export const generateJWTToken = (payload: RegisteredUserInt): string => {
  const token = jwt.sign({ payload }, jwtSecret, { expiresIn: "2h" });
  return token;
};

export const decodeJWTToken = (token: string): JWTInterface => {
  const payload = jwt.verify(token, jwtSecret) as JWTInterface;
  return payload;
};
