import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const PORT = 3000;
  const start = () => console.log(`😎 http://localhost:${PORT}`);
  await app.listen(PORT, start);
}
bootstrap();
