import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';

async function bootstrap() {

  const httpsOptions = {
    key: fs.readFileSync('./ssl/certs/private_key'),
    cert: fs.readFileSync('./ssl/certs/certificate.'),
  };

  const app = await NestFactory.create(AppModule,  { httpsOptions });

  app.setGlobalPrefix('api');
  app.use(cookieParser());



  app.enableCors({
    origin: [
      // 'http://localhost:3000',
      'https://rentrocket.lockshield.online',
    ],
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });


  await app.listen(4200);
}
bootstrap();
