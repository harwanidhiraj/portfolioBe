import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/index";

interface ProjectAttributes {
  id: number;
  title: string;
  gitHubUrl?: string;
  liveUrl?: string;
  imageUrl: string;
  tech: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type ProjectCreationAttributes = Optional<
  ProjectAttributes,
  "id" | "createdAt" | "updatedAt" | "gitHubUrl" | "liveUrl"
>;

class Project
  extends Model<ProjectAttributes, ProjectCreationAttributes>
  implements ProjectAttributes
{
  public id!: number;
  public title!: string;
  public gitHubUrl!: string;
  public liveUrl!: string;
  public imageUrl!: string;
  public tech!: string;
  public description!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    gitHubUrl: { type: DataTypes.STRING, allowNull: true },
    liveUrl: { type: DataTypes.STRING, allowNull: true },
    imageUrl: { type: DataTypes.STRING, allowNull: false },
    tech: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    sequelize,
    tableName: "projects",
    modelName: "Project",
    timestamps: true,
  }
);

export default Project;
