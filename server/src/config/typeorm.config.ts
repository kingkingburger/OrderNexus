import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Company } from "../company/entities/company.entity";
import { Order } from "../order/entities/order.entity";
import * as process from "process";

export const TypeormConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_ID || "postgres",
  password: process.env.DB_PASS || "1234",
  database: process.env.DB_DATABASE || "test",
  // entities: [__dirname + "/../**/*.entity.{js,ts}"],
  entities: [Company, Order],
  // autoLoadEntities: true,
  synchronize: true,
  logging: true,
  // logging: false,
  keepConnectionAlive: true //true 옵션을 설정할 경우 Hot reload 시 DB 연결을 유지해준다.
};
