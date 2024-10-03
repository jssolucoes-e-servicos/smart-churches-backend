import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoggerService } from '../services/logger.service';

@Controller('logs')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @Get()
  async getLogs(@Query('level') level: string, @Query('origin') origin: string, @Query('date') date: string, @Res() res: Response) {
    const logs = await this.loggerService.getAllLogs();
    return res.render('logs', { logs: JSON.stringify(logs) });
  }

  @Get('/clear')
  clearFilters(@Res() res: Response) {
    // Redireciona para a página de logs sem filtros (todos os logs)
    return res.redirect('/logs');
  }
}
