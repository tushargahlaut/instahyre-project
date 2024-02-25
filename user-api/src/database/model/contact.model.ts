import { DataTypes, Model } from "sequelize";
import {
  ContactInt,
  ContactCreation,
} from "../../interfaces/contact.interface";
import sequelize from "../connection/sequelize.connection";
import RegisteredUser from "./user.model";

class Contact extends Model<ContactInt, ContactCreation> implements ContactInt {
  public contact_id!: string;
  public user_id!: string;
  public name!: string;
  public phone_number!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Contact.init(
  {
    contact_id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  { sequelize }
);

export default Contact;
