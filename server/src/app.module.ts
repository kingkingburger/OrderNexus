import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CompanyModule } from "./company/company.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { OrderModule } from "./order/order.module";
import { LoggerMiddleware } from "./logger/logger.middleware";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Company } from "./company/entities/company.entity";
import { Order } from "./order/entities/order.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 전역으로 사용하기
      envFilePath: ".env"
    }),

    // [23.05.22] typeorm 설정(.env 파일을 쓰기 위함)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("DATABASE_HOST"),
        port: parseInt(configService.get<string>("DATABASE_PORT")),
        username: configService.get<string>("DATABASE_USER"),
        password: configService.get<string>("DATABASE_PASS"),
        database: configService.get<string>("DATABASE_NAME"),
        entities: [Company, Order],
        autoLoadEntities: true,
        logging: true,
        // synchronize: true 한번 true 하고 false => 안그러면 테이블 데이터 없어짐
        synchronize: false
      })
    }),
    CompanyModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes("*"); // 모든 경로로 들어오는곳에 LoggerMiddleware를 apply 시켜줍니다.
  }
}
