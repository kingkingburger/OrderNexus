import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as fs from "fs";

async function bootstrap() {
  const key = fs.existsSync("/etc/letsencrypt/live/jaewon.store/privkey.pem");
  const cert = fs.existsSync("/etc/letsencrypt/live/jaewon.store/fullchain.pem");

  const httpsOptions = {
    key: key ? fs.readFileSync("/etc/letsencrypt/live/jaewon.store/privkey.pem") : null,
    cert: cert ? fs.readFileSync("/etc/letsencrypt/live/jaewon.store/fullchain.pem") : null
  };

  let app;
  if (key && cert) {
    app = await NestFactory.create(AppModule, { httpsOptions });
  } else {
    app = await NestFactory.create(AppModule);
  }
  app.enableCors();
  await app.listen(3586);
}

bootstrap();
