import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EvolutionService } from "src/modules/evolution/services/evolution.service";

@Module({
    imports: [HttpModule],
    providers: [ConfigService, EvolutionService],
    exports: [EvolutionService],
})
export class EvolutionModule { }
