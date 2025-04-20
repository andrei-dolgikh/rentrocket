import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {

  const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, '../src/ssl/certs/private_key')),
    cert: fs.readFileSync(path.join(__dirname, '../src/ssl/certs/certificate')),
  };

  // const app = await NestFactory.create(AppModule,  { httpsOptions });
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.use(cookieParser());



  app.enableCors({
    origin: [
      // 'http://localhost:3000',
      configService.get('FRONTEND_URL'),
      'https://rentrocket.lockshield.online',
    ],
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });
  


  await app.listen(4200);
}
bootstrap();
