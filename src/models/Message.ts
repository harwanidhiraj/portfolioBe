import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/index";

interface MessageAttributes {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type MessageCreationAttributes = Optional<
  MessageAttributes,
  "id" | "createdAt" | "updatedAt"
>;

class Message
  extends Model<MessageAttributes, MessageCreationAttributes>
  implements MessageAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public message!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: "messages",
    modelName: "Message",
    timestamps: true,
  }
);

export default Message;
