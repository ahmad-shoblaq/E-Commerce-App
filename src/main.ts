import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
    LoggingInterceptor,
    TimeoutInterceptor,
    TransformInterceptor,
} from '@common/interceptors';
import { HttpExceptionFilter } from '@common/filters';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({ whitelist: true, transform: true }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(
        new LoggingInterceptor(),
        new TimeoutInterceptor(),
    );
    await app.listen(process.env.PORT ?? 3000);
    console.log(process.env.PORT);
}
bootstrap();
