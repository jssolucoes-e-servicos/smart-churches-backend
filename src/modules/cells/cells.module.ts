import { Module } from '@nestjs/common';
import { CellsController } from 'src/modules/cells/controllers/cells.controller';
import { CellsService } from 'src/modules/cells/services/cells.service';
import { LoggerService } from 'src/modules/logger/services/logger.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Module({
  controllers: [CellsController],
  providers: [PrismaService, LoggerService, CellsService],
  exports: [CellsService],
})
export class CellsModule {}
