import { Injectable, Logger as LoggerNest } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import cuid from 'cuid';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { db } from 'src/modules/logger/configs/sqlite.config';

import * as winston from 'winston';

@Injectable()
export class LoggerService {
  private file_logger: winston.Logger;

  constructor() {
    this.file_logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), new winston.transports.File({ filename: 'logs/combined.log' })],
    });
  }

  save(level: string, origin: string, message: string) {
    return new Promise<void>((resolve, reject) => {
      const timestamp = new Date().toISOString();
      const id = cuid();
      const query = `
        INSERT INTO logs (id, level, origin, message, timestamp)
        VALUES (?, ?, ?, ?, ?)
      `;

      db.run(query, [id, level, origin, message, timestamp], err => {
        if (err) {
          console.error('Erro ao inserir log:', err);
          reject(err);
        } else {
          console.log('Log inserido com sucesso.');
          resolve();
        }
      });
    });
  }

  getLogsByLevel(level: string) {
    return new Promise<any[]>((resolve, reject) => {
      const query = `
        SELECT * FROM logs WHERE level = ?
      `;
      db.all(query, [level], (err, rows) => {
        if (err) {
          console.error('Erro ao consultar logs:', err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  getLogsFiltered(level: string, origin: string, date: string) {
    return new Promise<any[]>((resolve, reject) => {
      const query = `
        SELECT * FROM logs WHERE level = ? AND origin = ? AND timestamp = ?
      `;
      db.all(query, [level, origin, date], (err, rows) => {
        if (err) {
          console.error('Erro ao consultar logs:', err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Consultar todos os logs
  getAllLogs() {
    return new Promise<any[]>((resolve, reject) => {
      const query = `
        SELECT * FROM logs
      `;
      db.all(query, (err, rows) => {
        if (err) {
          console.error('Erro ao consultar logs: ' + err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  deleteOldLogs() {
    const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString();
    return new Promise<void>((resolve, reject) => {
      const query = `
        DELETE FROM logs WHERE timestamp < ?
      `;
      db.run(query, [sixtyDaysAgo], err => {
        if (err) {
          console.error('Erro ao deletar logs antigos:', err);
          reject(err);
        } else {
          console.log('Logs antigos deletados com sucesso.');
          resolve();
        }
      });
    });
  }

  async setRequest(host: string, method: string, url: string) {
    if (url !== '/logs') {
      const _logger = new LoggerNest('LoggerMiddleware');
      const message: string = `METHOD: ${method}, HOST: ${host} , URL: ${url}`;
      _logger.log(message);
      this.file_logger.info({ host, message });
      await this.save('request', host, message);
    }
  }

  async setLog(origin: string, message: string) {
    const _logger = new LoggerNest(origin);
    _logger.log(message);
    this.file_logger.info({ origin, message });
    await this.save('info', origin, message);
  }

  async setWarn(origin: string, message: string) {
    const _logger = new LoggerNest(origin);
    _logger.warn(message);
    this.file_logger.warn({ origin, message });
    await this.save('warn', origin, message);
  }

  async setError(origin: string, message: string) {
    const _logger = new LoggerNest(origin);
    _logger.error(message);
    this.file_logger.error({ origin, message });
    await this.save('error', origin, message);
  }

  // Backup e exclusão de logs
  @Cron('0 0 1 * *')
  async backupLogs() {
    const lastMonth = this.getLastMonth();
    const logs = await this.getAllLogs();

    const backupFile = join(process.cwd(), 'logs/backups', `logs-${lastMonth}.json`);
    writeFileSync(backupFile, JSON.stringify(logs, null, 2));

    await this.deleteOldLogs();
  }

  getLastMonth() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // Mês anterior
    return `${year}-${month < 10 ? '0' + month : month}`;
  }
}
