/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient, SupabaseClient as SupabaseClientJS } from "@supabase/supabase-js";
import { configLoaderHelper } from "src/common/helpers/config-loader.helper";

@Injectable()
export class SupabaseClient {
    private readonly client: SupabaseClientJS;
    private readonly serviceRoleClient: SupabaseClientJS;

    constructor(private readonly configService: ConfigService) {
        this.client = createClient(configLoaderHelper().supabase.url, configLoaderHelper().supabase.anon_key);
        this.serviceRoleClient = createClient(
            configLoaderHelper().supabase.url,
            configLoaderHelper().supabase.service_key,
            { auth: { persistSession: false } } // Importante para evitar problemas de sessão no backend
        );
    }

    getClient(): SupabaseClientJS {
        return this.client;
    }

    getServiceRoleClient(): SupabaseClientJS {
        return this.serviceRoleClient;
    }
}
