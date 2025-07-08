import { QueryInterface, DataTypes } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.changeColumn("profiles", "roles", {
    type: DataTypes.TEXT,
    allowNull: false,
  });

  await queryInterface.changeColumn("profiles", "description", {
    type: DataTypes.TEXT,
    allowNull: false,
  });

  await queryInterface.changeColumn("profiles", "resumeUrl", {
    type: DataTypes.TEXT,
    allowNull: false,
  });

  await queryInterface.changeColumn("profiles", "imageUrl", {
    type: DataTypes.TEXT,
    allowNull: false,
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.changeColumn("profiles", "roles", {
    type: DataTypes.STRING(255),
    allowNull: false,
  });

  await queryInterface.changeColumn("profiles", "description", {
    type: DataTypes.STRING(255),
    allowNull: false,
  });

  await queryInterface.changeColumn("profiles", "resumeUrl", {
    type: DataTypes.STRING(255),
    allowNull: false,
  });

  await queryInterface.changeColumn("profiles", "imageUrl", {
    type: DataTypes.STRING(255),
    allowNull: false,
  });
}
