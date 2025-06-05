import { ExpressAdapter } from "@bull-board/express";
import { BullBoardModule } from "@bull-board/nestjs";
import { BullModule } from "@nestjs/bull";
import { CacheModule } from "@nestjs/cache-manager";
import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ScheduleModule } from "@nestjs/schedule";
import { ThrottlerModule } from "@nestjs/throttler";
import { configLoaderHelper } from "./common/helpers/config-loader.helper";
import { LoggerMiddleware } from "./common/middlewares/logger.middleware";
import { envSchema } from "./common/validators/env-schema";
import { AuthModule } from "./modules/auth/auth.module";
import { CellsNetworkModule } from "./modules/cells-network/cells-network.module";
import { CellsModule } from "./modules/cells/cells.module";
import { ChurchModule } from "./modules/church/church.module";
import { EvolutionModule } from "./modules/evolution/evolution.module";
import { LoggerModule } from "./modules/logger/logger.module";
import { LoggerService } from "./modules/logger/services/logger.service";
import { PlainModule } from "./modules/plain/plain.module";
import { UsersModule } from "./modules/users/users.module";
//import { GraphQlModule } from "./modules/graphql/graphql.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configLoaderHelper],
      validationSchema: envSchema,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      url: configLoaderHelper().redis.url,
    }),
    BullBoardModule.forRoot({
      route: "/server/queues",
      adapter: ExpressAdapter, // Or FastifyAdapter from `@bull-board/fastify`
    }),
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: ".",
      newListener: false,
      removeListener: false,
      maxListeners: 10,
      verboseMemoryLeak: false,
      ignoreErrors: false,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    //GraphQlModule,
    PlainModule,
    UsersModule,
    AuthModule,
    ChurchModule,
    CellsNetworkModule,
    LoggerModule,
    CellsModule,
    EvolutionModule,
  ],
  controllers: [],
  providers: [LoggerService],
})
export class AppModule {
  static port: string;
  constructor(private readonly configService: ConfigService) {
    let app_port: string | undefined = configService.get("HTTP_PORT");

    if (!app_port) {
      app_port = process.env.PORT;
      if (!app_port) {
        app_port = "3111";
      }
    }
    AppModule.port = app_port;
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
