import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/index";

interface ProfileAttributes {
  id: number;
  name: string;
  roles: string;
  description: string;
  resumeUrl: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type ProfileCreationAttributes = Optional<ProfileAttributes, 'id' | 'createdAt' | 'updatedAt'>

class Profile
  extends Model<ProfileAttributes, ProfileCreationAttributes>
  implements ProfileAttributes
{
  public id!: number;
  public name!: string;
  public roles!: string;
  public description!: string;
  public resumeUrl!: string;
  public imageUrl!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Profile.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    roles: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    resumeUrl: { type: DataTypes.STRING, allowNull: false },
    imageUrl: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: "profiles",
    modelName: "Profile",
    timestamps: true,
  }
);

export default Profile;
