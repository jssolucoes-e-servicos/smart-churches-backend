import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SupabaseClient } from "src/modules/supabase/clients/supabase.client";
import { SupabaseService } from "src/modules/supabase/services/supabase.service";

@Module({
  providers: [ConfigService, SupabaseService, SupabaseClient],
  exports: [SupabaseService],
})
export class SupabaseModule { }
