import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
// console.log("path.join(_dir) = ", path.join(_dirname));
async function bootstrap() {
  // const httpsOptions = {
  //   key: fs.readFileSync("./config/cert.key"),
  //   cert: fs.readFileSync("./config/cert.crt")
  // };
  // .env 파일 로드
  dotenv.config();
  const app = await NestFactory.create(
    AppModule
    // , { httpsOptions }
  );
  app.enableCors();
  await app.listen(3586);
}

bootstrap();
