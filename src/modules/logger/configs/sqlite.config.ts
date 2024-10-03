import { join } from 'path';
import sqlite3 from 'sqlite3';

const dbPath = join(process.cwd(), 'database/logs.db');

export const db = new sqlite3.Database(dbPath, err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados SQLite:', err);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
    createLogsTable();
  }
});

const createLogsTable = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS logs (
      id TEXT PRIMARY KEY,
      level TEXT NOT NULL,
      origin TEXT NOT NULL,
      message TEXT NOT NULL,
      timestamp TEXT NOT NULL
    );
  `;
  db.run(createTableQuery, err => {
    if (err) {
      console.error('Erro ao criar a tabela de logs:', err);
    } else {
      console.log('Tabela de logs criada ou já existe.');
    }
  });

  const createIndexQuery = `
    CREATE INDEX IF NOT EXISTS idx_logs_level ON logs(level);
    CREATE INDEX IF NOT EXISTS idx_logs_timestamp ON logs(timestamp);
  `;
  db.run(createIndexQuery);
};
