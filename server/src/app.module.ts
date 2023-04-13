import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CompanyModule } from "./company/company.module";
import { TypeormConfig } from "./config/typeorm.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { OrderModule } from "./order/order.module";
import { utilities, WinstonModule } from "nest-winston";
import { format, transports } from "winston";
import { LoggerMiddleware } from "./logger/logger.middleware";

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeormConfig),
    WinstonModule.forRoot({
      transports: [
        new transports.Console({
          level: "info",
          format: format.combine(format.timestamp(), utilities.format.nestLike("MyApp", { prettyPrint: true }))
        })
      ]
    }),
    CompanyModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(cusumer: MiddlewareConsumer): any {
    cusumer.apply(LoggerMiddleware).forRoutes("*"); // 모든 경로로 들어오는곳에 LoggerMiddleware를 apply 시켜줍니다.
  }
}
