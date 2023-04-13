import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CompanyModule } from "./company/company.module";
import { TypeormConfig } from "./config/typeorm.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { OrderModule } from "./order/order.module";
import { LoggerMiddleware } from "./logger/logger.middleware";

@Module({
  imports: [TypeOrmModule.forRoot(TypeormConfig), CompanyModule, OrderModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes("*"); // 모든 경로로 들어오는곳에 LoggerMiddleware를 apply 시켜줍니다.
  }
}
