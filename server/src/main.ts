import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as fs from "fs";

async function bootstrap() {
  const env = process.env.NODE_ENV;
  const httpsOptions = {
    key: env === "prop" ? fs.readFileSync("/etc/letsencrypt/live/jaewon.store/privkey.pem") : null,
    cert: env === "prop" ? fs.readFileSync("/etc/letsencrypt/live/jaewon.store/fullchain.pem") : null
  };

  console.log("env = ", env);
  let app;
  if (env === "prop") {
    app = await NestFactory.create(AppModule, { httpsOptions });
  } else {
    app = await NestFactory.create(AppModule);
  }
  app.enableCors();
  await app.listen(3586);
}

bootstrap();
