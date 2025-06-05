import { ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SentryFilter } from "src/common/filters/sentry.filter";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //validators
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );
  //cors
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new SentryFilter(httpAdapter));

  const swaggerConfig = new DocumentBuilder()
    .setTitle("smartChurches API")
    .setDescription(
      "This API was created to facilitate and concentrate the model of integration and connection of services and devices with the smartChurhes Platform."
    )
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT Token",
        in: "header",
      },
      "JWT-auth"
    )
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api", app, swaggerDocument);

  await app.listen(parseInt(AppModule.port));
}
bootstrap();
