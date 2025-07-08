import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/index";

interface ExperienceAttributes {
  id: number;
  title: string;
  companyName: string;
  duration: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type ExperienceCreationAttributes = Optional<
  ExperienceAttributes,
  "id" | "createdAt" | "updatedAt"
>;

class Experience
  extends Model<ExperienceAttributes, ExperienceCreationAttributes>
  implements ExperienceAttributes
{
  public id!: number;
  public title!: string;
  public companyName!: string;
  public duration!: string;
  public description!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Experience.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    companyName: { type: DataTypes.STRING, allowNull: false },
    duration: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    sequelize,
    tableName: "experiences",
    modelName: "Experience",
    timestamps: true,
  }
);

export default Experience;
