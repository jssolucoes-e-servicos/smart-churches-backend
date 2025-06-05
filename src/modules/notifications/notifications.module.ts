import { Module } from "@nestjs/common";
import { EvolutionModule } from "src/modules/evolution/evolution.module";
import { EvolutionService } from "src/modules/evolution/services/evolution.service";
import { WhatsappNotificationService } from "src/modules/notifications/services/whatsapp-notification.service";

@Module({
    imports: [EvolutionModule],
    providers: [WhatsappNotificationService, EvolutionService],
    exports: [WhatsappNotificationService],
})
export class NotificationsModule { }
