import { Optional } from "sequelize";

export interface ContactInt {
  contact_id: string;
  user_id: string;
  name: string;
  phone_number: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContactCreation extends Optional<ContactInt, "contact_id"> {}
