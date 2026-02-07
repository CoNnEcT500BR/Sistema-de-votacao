/**
 * Script de Inicialização do Banco de Dados
 * Cria o banco de dados e as tabelas necessárias para o sistema de votação
 *
 * Uso: node scripts/init-db.js
 */

require("dotenv").config();
require("../models");
const mysql = require("mysql2/promise");
const sequelize = require("../config/database");

async function initializeDatabase() {
  console.log("🔧 Iniciando preparação do banco de dados...\n");

  try {
    // 1. Criar banco de dados se não existir
    console.log("📦 Criando banco de dados...");
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASS || "",
    });

    const dbName = process.env.DB_NAME || "voting_system";

    try {
      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
      console.log(
        `✓ Banco de dados '${dbName}' criado/verificado com sucesso\n`,
      );
    } catch (err) {
      if (err.code !== "ER_DB_CREATE_EXISTS") {
        throw err;
      }
      console.log(`✓ Banco de dados '${dbName}' já existe\n`);
    }

    await connection.end();

    // 2. Autenticar com Sequelize
    console.log("🔗 Conectando ao banco de dados...");
    await sequelize.authenticate();
    console.log("✓ Conexão com MySQL estabelecida com sucesso\n");

    // 3. Definir associações
    console.log("🔗 Definindo associações entre modelos...");
    console.log("✓ Associações definidas com sucesso\n");

    // 4. Sincronizar tabelas
    console.log("📊 Criando tabelas...");
    await sequelize.sync({ force: false, alter: false });
    console.log("✓ Tabelas sincronizadas com sucesso\n");

    console.log("✅ Banco de dados inicializado com sucesso!");
    console.log("   Você pode iniciar o servidor com: npm start\n");

    process.exit(0);
  } catch (err) {
    console.error("❌ Erro ao inicializar o banco de dados:");
    console.error(err.message);
    console.error(
      "\nDica: Verifique as variáveis de ambiente no arquivo .env\n",
    );
    process.exit(1);
  }
}

initializeDatabase();
