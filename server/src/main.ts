import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as fs from "fs";

async function bootstrap() {
  // const httpsOptions = {
  //   key: fs.readFileSync("./secrets/private-key.pem"),
  //   cert: fs.readFileSync("./secrets/public-certificate.pem")
  // };
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3586);
}

bootstrap();
