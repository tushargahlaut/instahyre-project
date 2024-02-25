import { DataTypes, Model } from "sequelize";
import { SpamCreation, SpamInt } from "../../interfaces/spam.interface";
import sequelize from "../connection/sequelize.connection";

class Spam extends Model<SpamInt, SpamCreation> implements SpamInt {
  public spam_id!: string;
  public phone_number!: number;
  public spam_count!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Spam.init(
  {
    spam_id: {
      primaryKey: true,
      type: DataTypes.UUIDV4,
      defaultValue: DataTypes.UUIDV4,
    },
    spam_count: {
      type: DataTypes.NUMBER,
      defaultValue: 0,
    },
    phone_number: {
      type: DataTypes.NUMBER,
      unique: true,
      allowNull: false,
    },
  },
  { sequelize }
);

export default Spam;
