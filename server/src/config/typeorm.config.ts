import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {Company} from "../company/entities/company.entity";
import {Order} from "../order/entities/order.entity";

export const TypeormConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "test",
    // entities: [__dirname + "/../**/*.entity.{js,ts}"],
    entities: [Company, Order],
    // autoLoadEntities: true,
    synchronize: true,
    logging: true,
    keepConnectionAlive: true //true 옵션을 설정할 경우 Hot reload 시 DB 연결을 유지해준다.
};
