import { Controller, Get } from "@nestjs/common";
import { EfiPayWebhookService } from "src/modules/efipay/services/efipay-webhook.service";

@Controller("webhooks/efipay")
export class EfiPayWebhookController {
  constructor(private readonly _service: EfiPayWebhookService) { }

  @Get()
  getHello(): string {
    return "ok";
  }
}
