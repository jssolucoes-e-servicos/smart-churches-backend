import { Module } from "@nestjs/common";
import { EfiPayWebhookController } from "src/modules/efipay/controllers/efipay-webhook.controller";
import { EfiPayService } from "src/modules/efipay/services/efipay.service";
import { LoggerService } from "src/modules/logger/services/logger.service";
import { PrismaService } from "src/modules/prisma/services/prisma.service";

@Module({
  controllers: [EfiPayWebhookController],
  providers: [LoggerService, PrismaService, EfiPayService],
  exports: [EfiPayService],
})
export class IntegratiosEfiModule { }
