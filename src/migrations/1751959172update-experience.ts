import { QueryInterface, DataTypes } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.changeColumn("experiences", "description", {
    type: DataTypes.TEXT,
    allowNull: false,
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.changeColumn("experiences", "description", {
    type: DataTypes.STRING(255),
    allowNull: false,
  });
}
