import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppExceptionFilter } from './contexts/shared/application/filters/app-exception-filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const logger: Logger = new Logger('MAIN');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix(process.env.APP_PREFIX);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalFilters(new AppExceptionFilter());
    app.enableCors();

    const config = new DocumentBuilder()
        .setTitle(process.env.SWAGGER_TITLE)
        .setDescription(process.env.SWAGGER_DESCRIPTION)
        .setVersion(process.env.SWAGGER_VERSION)
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(process.env.SWAGGER_URI, app, document);

    await app.listen(Number(process.env.APP_PORT));
    logger.log(`server running on port ${process.env.APP_PORT}`);
}

bootstrap();
