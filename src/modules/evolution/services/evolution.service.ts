/* eslint-disable prettier/prettier */
// src/evolution/evolution.service.ts
import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosRequestConfig } from "axios";
import { firstValueFrom } from "rxjs";
import { configLoaderHelper } from "src/common/helpers/config-loader.helper";

@Injectable()
export class EvolutionService {
    private readonly apiUrl: string = configLoaderHelper().evolution.url;
    private readonly apiToken: string = configLoaderHelper().evolution.token;

    constructor(private readonly httpService: HttpService) { }

    async sendWhatsAppMessage(instance: string, phoneNumber: string, message: string): Promise<any> {
        try {
            const config: AxiosRequestConfig = {
                headers: {
                    apiKey: this.apiToken,
                },
            };
            const response = await firstValueFrom(
                this.httpService.post(
                    `${this.apiUrl}/message/sendText/${instance}`,
                    {
                        number: phoneNumber,
                        text: message,
                    },
                    config
                )
            );
            return response.data;
        } catch (error) {
            console.error("Erro ao enviar mensagem via Evolution API:", error.response?.data || error.message);
            throw error;
        }
    }
}
