import { DataSource } from "typeorm";

require("dotenv").config();

export const AppDataSource =
  process.env.NODE_ENV === "tests"
    ? new DataSource({
        type: "sqlite",
        database: ":memory:",
        entities: ["src/entities/*.ts"],
        synchronize: true,
      })
    : new DataSource({
        type: "postgres",
        host: process.env.POSTGRES_HOST,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        port: Number(process.env.POSTGRES_PORT),
        ssl:
          process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
        // ssl: { rejectUnauthorized: false },
        synchronize: false,
        logging: true,
        entities:
          process.env.NODE_ENV === "production"
            ? ["dist/entities/**/*.js"]
            : ["src/entities/**/*.ts"],
        migrations:
          process.env.NODE_ENV === "production"
            ? ["dist/migrations/**/*.js"]
            : ["src/migrations/**/*.ts"],
      });