/**
 * Основной разработчик ElmirKuba
 * Приложение: backend-часть проекта KubaGame
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ApiExceptionFilter, exceptionFactoryHandler } from '@backend/filters';

/**
 * Главная функция запуска NestJS приложения
 * @returns {Promise<void>}
 */
async function bootstrap() {
  /** Созданный экземпляр NestJS приложения */
  const app = await NestFactory.create(AppModule);

  /** Глобальный префикс REST-API */
  const globalPrefix = 'api';

  app
    .setGlobalPrefix(globalPrefix)
    .useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        stopAtFirstError: false,
        exceptionFactory: exceptionFactoryHandler,
      })
    )
    .useGlobalFilters(new ApiExceptionFilter(app.get(HttpAdapterHost)));

  /** Порт, который занимает REST-API */
  const port = process.env.PORT || 3000;

  await app.listen(port);

  Logger.log(
    `🚀 NestJS приложение запущено и слушает REST-API: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
