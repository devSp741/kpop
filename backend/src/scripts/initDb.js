import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initDatabase() {
  console.log('Connecting to MySQL server...');

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
  });

  try {
    console.log('Executing DDL Schema (schema.sql)...');
    const schemaSql = fs.readFileSync(path.join(__dirname, '../../db/schema.sql'), 'utf-8');
    await connection.query(schemaSql);
    console.log('Schema created successfully!');

    console.log('Executing Seed Data (seed.sql)...');
    const seedSql = fs.readFileSync(path.join(__dirname, '../../db/seed.sql'), 'utf-8');
    await connection.query(seedSql);
    console.log('Seed data inserted successfully (Top 20 Artists + Activity Events)!');
  } catch (error) {
    console.error('Database Initialization Failed:', error.message);
  } finally {
    await connection.end();
  }
}

initDatabase();
