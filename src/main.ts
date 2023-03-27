import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { responseMiddleware } from './middleware/response.middleware';

async function bootstrap() {
  const logger = new Logger(AppModule.name);
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.use(responseMiddleware);
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000', 'https://dictionary-ashy.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  const PORT = process.env.PORT;
  await app.listen(PORT);
  logger.debug(`Server started on port ${PORT}`);
}
bootstrap();
