import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  let nestAppOptions = {};
  const appMode = process.env.MODE;
  if (appMode === 'prod') {
    nestAppOptions = {
      key: fs.readFileSync(path.join(__dirname, '../src/ssl/certs/private_key')),
      cert: fs.readFileSync(path.join(__dirname, '../src/ssl/certs/certificate')),
    };
  }
  const app = await NestFactory.create(AppModule, nestAppOptions);
  const configService = app.get(ConfigService);
  const FRONTEND_URL = configService.get('FRONTEND_URL');

  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.enableCors({
    origin: [
      FRONTEND_URL,
    ],
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });
  


  await app.listen(4200);
}
bootstrap();
