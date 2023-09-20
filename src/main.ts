import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const config = await app.get(ConfigService);
  const PORT = (await config.get<number>('APP_PORT')) || 3000;

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
