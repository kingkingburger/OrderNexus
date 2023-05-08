import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as fs from "fs";
import * as path from "path";

async function bootstrap() {
  // const httpsOptions = {
  //   key: fs.readFileSync("./config/cert.key"),
  //   cert: fs.readFileSync("./config/cert.crt")
  // };
  const app = await NestFactory.create(
    AppModule
    // , { httpsOptions }
  );
  app.enableCors();
  await app.listen(3586);
}

bootstrap();
