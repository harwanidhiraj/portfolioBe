import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/index";

interface AboutAttributes {
  id: number;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type AboutCreationAttributes = Optional<
  AboutAttributes,
  "id" | "createdAt" | "updatedAt"
>;

class About
  extends Model<AboutAttributes, AboutCreationAttributes>
  implements AboutAttributes
{
  public id!: number;
  public description!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

About.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    description: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: "abouts",
    modelName: "About",
    timestamps: true,
  }
);

export default About;
