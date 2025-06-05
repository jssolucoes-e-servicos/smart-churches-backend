import { Module } from "@nestjs/common";
import { LoggerService } from "src/modules/logger/services/logger.service";
import { PrismaService } from "src/modules/prisma/services/prisma.service";
import { PlainController } from "./controllers/plain.controller";
import { PlainService } from "./services/plain.service";

@Module({
  controllers: [PlainController],
  providers: [PlainService, PrismaService, LoggerService],
  exports: [PlainService],
})
export class PlainModule { }
