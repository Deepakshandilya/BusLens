// Database configuration for BusLens
const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'buslensdb',
  port: 3306,
  charset: 'utf8mb4',
  timezone: '+00:00',
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
}

// Connection pool configuration
const poolConfig = {
  ...dbConfig,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000
}

export { dbConfig, poolConfig }

// Example usage:
// import { dbConfig } from './config/database.js'
// const connection = mysql.createConnection(dbConfig)
