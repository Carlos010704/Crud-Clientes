import { Pool } from 'pg';
import config from '../config';

const dbConfig = {
  user: config.user,
  password: config.password,
  host: config.server,
  database: config.database
};

const pool = new Pool(dbConfig);

export async function getConnection(){

const conn = await pool.connect();
console.log('Conexión exitosa a PostgreSQL!');

return conn;

}

export function releaseConnection(client) {
  client.release();
  console.log('Conexión liberada.');
}

export { pool };
