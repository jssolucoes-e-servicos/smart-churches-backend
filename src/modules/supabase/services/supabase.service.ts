// src/supabase/supabase.service.ts
import { Injectable } from "@nestjs/common";
import { SupabaseClient as SupabaseClientJS } from "@supabase/supabase-js";
import { SupabaseClient } from "src/modules/supabase/clients/supabase.client";

@Injectable()
export class SupabaseService {
    private readonly client: SupabaseClientJS;
    private readonly serviceRoleClient: SupabaseClientJS;

    constructor(private readonly supabaseClient: SupabaseClient) {
        this.client = this.supabaseClient.getClient();
        this.serviceRoleClient = this.supabaseClient.getServiceRoleClient();
    }

    getClient(): SupabaseClientJS {
        return this.client;
    }

    getServiceRoleClient(): SupabaseClientJS {
        return this.serviceRoleClient;
    }

    // Adicione aqui métodos para interagir com o Supabase, por exemplo:

    async obterUsuarioPorId(id: string) {
        const { data, error } = await this.client.auth.getUser(id);
        if (error) {
            console.error("Erro ao obter usuário:", error);
            throw error;
        }
        return data?.user;
    }

    async cadastrarNovoMembro(membro: any) {
        const { data, error } = await this.serviceRoleClient
            .from("membros") // Substitua 'membros' pelo nome da sua tabela
            .insert([membro])
            .select();
        if (error) {
            console.error("Erro ao cadastrar membro:", error);
            throw error;
        }
        return data;
    }

    async uploadArquivo(file: Buffer, filename: string, bucketName: string = "arquivos-igreja") {
        const { data, error } = await this.client.storage.from(bucketName).upload(filename, file);
        if (error) {
            console.error("Erro ao fazer upload do arquivo:", error);
            throw error;
        }
        return data;
    }

    async obterUrlPublicaArquivo(filename: string, bucketName: string = "arquivos-igreja") {
        const { data } = this.client.storage.from(bucketName).getPublicUrl(filename);
        return data.publicUrl;
    }

    // Outras funções para interagir com Auth, Database, Storage, Functions, etc.
}
