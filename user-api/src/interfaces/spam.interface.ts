import { Optional } from "sequelize";

export interface SpamInt {
  spam_id: string;
  phone_number: number;
  spam_count: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SpamCreation
  extends Optional<SpamInt, "spam_id" | "spam_count"> {}

export interface UsersWithSpamCount {
  name: string;
  spam_count: number;
  phone_number: number;
  user_id?: string;
}
