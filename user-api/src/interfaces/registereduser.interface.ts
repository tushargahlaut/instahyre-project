import { Optional } from "sequelize";

export interface RegisteredUserInt {
  user_id: string;
  name: string;
  email?: string;
  password: string;
  phone_number: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RegisteredUserCreation
  extends Optional<RegisteredUserInt, "user_id"> {}
