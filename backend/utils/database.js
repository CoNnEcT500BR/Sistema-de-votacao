const mysql = require("mysql2/promise");
const sequelize = require("../config/database");

async function initializeDatabaseIfNeeded() {
  try {
    // Tentar conectar ao MySQL
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASS || "",
    });

    const dbName = process.env.DB_NAME || "voting_system";

    // Criar banco de dados se não existir
    try {
      await connection.query(
        `CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
      );
    } catch (err) {
      if (err.code !== "ER_DB_CREATE_EXISTS") {
        throw err;
      }
    }

    await connection.end();

    // Autenticar com Sequelize
    await sequelize.authenticate();
    console.log("✓ Conexão com MySQL estabelecida");

    // Sincronizar tabelas
    await sequelize.sync({ force: false, alter: false });
    console.log("✓ Tabelas sincronizadas");
  } catch (err) {
    console.error("⚠️  Erro ao inicializar banco de dados:", err.message);
    console.error(
      "Dica: Execute 'npm run setup:db' para configurar automaticamente"
    );
    process.exit(1);
  }
}

module.exports = { initializeDatabaseIfNeeded };
