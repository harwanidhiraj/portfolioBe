import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

type Environments = "development" | "staging" | "production";

const NODE_ENV = process.env.NODE_ENV as Environments;

const config = {
  development: {
    env: "development",
    port: process.env.PROD_PORT,
    dbUrl: process.env.PROD_DB_URL,
  },
  staging: {
    env: "staging",
    port: process.env.PROD_PORT,
    dbUrl: process.env.PROD_DB_URL,
  },
  production: {
    env: "production",
    port: process.env.PROD_PORT,
    dbUrl: process.env.PROD_DB_URL,
  },
  test: {
    env: "test",
    port: process.env.PROD_PORT,
    dbUrl: process.env.PROD_DB_URL,
  },
}[NODE_ENV];

export default config;

if (!config.dbUrl) {
  throw new Error("Database URL is not defined");
}

export const sequelize = new Sequelize(config.dbUrl, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Disable strict cert validation
    },
    family: 6,
  },
  logging: false,
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL (Sequelize) connected");

    await sequelize.sync({ alter: true });
    console.log("✅ Tables synced");
  } catch (err) {
    console.error("❌ Sequelize connection error:", err);
    throw err;
  }
};
