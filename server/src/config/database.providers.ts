import { DataSource } from "typeorm";
import process from "process";

export const databaseProviders = [
  {
    provide: "DATA_SOURCE",
    useFactory: async () => {
      const dataSource = new DataSource({
        type: "postgres",
        host: process.env.DB_HOST || "localhost",
        port: +process.env.DB_PORT || 5432,
        username: process.env.DB_ID || "postgres",
        password: process.env.DB_PASS || "1234",
        database: process.env.DB_DATABASE || "test",
        entities: [__dirname + "/../**/*.entity{.ts,.js}"],
        synchronize: true
      });
      return dataSource.initialize();
    }
  }
];
