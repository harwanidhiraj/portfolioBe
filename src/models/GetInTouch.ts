import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/index";

interface GetInTouchAttributes {
  id: number;
  address: string;
  email: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type GetInTouchCreationAttributes = Optional<
  GetInTouchAttributes,
  "id" | "createdAt" | "updatedAt"
>;

class GetInTouch
  extends Model<GetInTouchAttributes, GetInTouchCreationAttributes>
  implements GetInTouchAttributes
{
  public id!: number;
  public address!: string;
  public email!: string;
  public phone!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

GetInTouch.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    address: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: "get_in_touches",
    modelName: "GetInTouch",
    timestamps: true,
  }
);

export default GetInTouch;
