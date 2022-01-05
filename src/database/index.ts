import { ConnectionOptions } from "typeorm";
import { ApiLog } from "../models/api-log.entity";

export const dbConnection: ConnectionOptions = {
  type: "mysql",
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT) ?? 3306,
  username: process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "1234",
  database: process.env.DATABASE ?? "test_appota",
  entities: [ApiLog],
  logging: false,
  synchronize: true,
};
