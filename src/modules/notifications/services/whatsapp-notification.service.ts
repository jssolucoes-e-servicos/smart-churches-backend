import { Injectable } from "@nestjs/common";
import { EvolutionService } from "src/modules/evolution/services/evolution.service";

@Injectable()
export class WhatsappNotificationService {
    constructor(private readonly evolutionService: EvolutionService) { }

    async sendNewMemberCongratulations(instance: string, phoneNumber: string, nomeMembro: string) {
        const message = `Olá ${nomeMembro}, seja bem-vindo(a) à Igreja Vivia em Celulas!`;
        try {
            await this.evolutionService.sendWhatsAppMessage(instance, phoneNumber, message);
            console.log(`Notificação enviada para ${phoneNumber}`);
        } catch (error) {
            console.error(`Erro ao enviar notificação para ${phoneNumber}:`, error);
        }
    }
}
