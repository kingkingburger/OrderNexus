import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CompanyModule } from "./company/company.module";
import { TypeormConfig } from "./config/typeorm.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { OrderModule } from "./order/order.module";

@Module({
  imports: [TypeOrmModule.forRoot(TypeormConfig), CompanyModule, OrderModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
