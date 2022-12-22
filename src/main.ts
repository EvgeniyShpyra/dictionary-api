import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger(AppModule.name);
  const app = await NestFactory.create(AppModule);
  const PORT = 3000;
  logger.log(`Server started on port ${PORT}`);
  await app.listen(PORT);
}
bootstrap();
