import { DataTypes, Model, UUIDV4 } from "sequelize";
import sequelize from "../connection/sequelize.connection";
import {
  RegisteredUserCreation,
  RegisteredUserInt,
} from "../../interfaces/registereduser.interface";

class RegisteredUser
  extends Model<RegisteredUserInt, RegisteredUserCreation>
  implements RegisteredUserInt
{
  public user_id!: string;
  public name!: string;
  public email?: string;
  public password!: string;
  public phone_number!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

RegisteredUser.init(
  {
    user_id: {
      primaryKey: true,
      type: DataTypes.UUIDV4,
      defaultValue: DataTypes.UUIDV4,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.NUMBER,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize }
);

export default RegisteredUser;
