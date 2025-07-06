import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/index";

interface SkillAttributes {
  id: number;
  name: string;
  iconName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type SkillCreationAttributes = Optional<
  SkillAttributes,
  "id" | "createdAt" | "updatedAt"
>;

class Skill
  extends Model<SkillAttributes, SkillCreationAttributes>
  implements SkillAttributes
{
  public id!: number;
  public name!: string;
  public iconName!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Skill.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    iconName: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: "skills",
    modelName: "Skill",
    timestamps: true,
  }
);

export default Skill;
