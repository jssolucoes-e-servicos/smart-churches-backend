import { Global, Module } from '@nestjs/common';
import { LoggerController } from 'src/modules/logger/controllers/logger.controller';
import { LoggerService } from 'src/modules/logger/services/logger.service';

@Global()
@Module({
  controllers: [LoggerController],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
