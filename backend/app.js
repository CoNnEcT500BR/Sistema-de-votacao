const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/database");
const Poll = require("./models/Poll");
const Option = require("./models/Option");
const Vote = require("./models/Vote");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json({ charset: "utf-8" }));

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  next();
});

// Definir associações antes de sincronizar
Option.belongsTo(Poll);
Poll.hasMany(Option, { onDelete: "CASCADE" });
Vote.belongsTo(Option);
Option.hasMany(Vote, { onDelete: "CASCADE" });

// Função para inicializar o banco de dados automaticamente
async function initializeDatabaseIfNeeded() {
  const mysql = require("mysql2/promise");

  try {
    // Tentar conectar ao MySQL
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
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

// Inicializar banco antes de iniciar servidor
initializeDatabaseIfNeeded();

app.get("/api/polls", async (req, res) => {
  try {
    const polls = await Poll.findAll({
      include: Option,
      raw: false,
    });
    res.json(polls);
  } catch (err) {
    console.error("Erro ao buscar polls:", err);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

app.post("/api/polls", async (req, res) => {
  try {
    const { title, startDate, endDate, options } = req.body;

    // Validações básicas
    if (!title || !startDate || !endDate || !options || options.length < 3) {
      return res
        .status(400)
        .json({ message: "Título, datas e mínimo 3 opções são obrigatórios" });
    }
    if (new Date(startDate) >= new Date(endDate)) {
      return res
        .status(400)
        .json({ message: "Data de início deve ser anterior à de término" });
    }

    // Cria poll
    const poll = await Poll.create({ title, startDate, endDate });

    // Cria opções associadas
    const optionPromises = options.map((opt) =>
      Option.create({ text: opt, PollId: poll.id })
    );
    await Promise.all(optionPromises);

    const pollWithOptions = await Poll.findByPk(poll.id, { include: Option });

    io.emit("pollsUpdated");

    res
      .status(201)
      .json({ message: "Enquete criada com sucesso", poll: pollWithOptions });
  } catch (err) {
    console.error("Erro ao criar enquete:", err);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// GET uma enquete específica
app.get("/api/polls/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const poll = await Poll.findByPk(id, { include: Option });

    if (!poll) {
      return res.status(404).json({ message: "Enquete não encontrada" });
    }

    res.json(poll);
  } catch (err) {
    console.error("Erro ao buscar enquete:", err);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// UPDATE uma enquete
app.put("/api/polls/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, startDate, endDate } = req.body;

    const poll = await Poll.findByPk(id);
    if (!poll) {
      return res.status(404).json({ message: "Enquete não encontrada" });
    }

    // Validações
    if (title) poll.title = title;
    if (startDate) poll.startDate = startDate;
    if (endDate) poll.endDate = endDate;

    if (new Date(poll.startDate) >= new Date(poll.endDate)) {
      return res
        .status(400)
        .json({ message: "Data de início deve ser anterior à de término" });
    }

    await poll.save();
    const pollWithOptions = await Poll.findByPk(id, { include: Option });

    res.json({
      message: "Enquete atualizada com sucesso",
      poll: pollWithOptions,
    });
  } catch (err) {
    console.error("Erro ao atualizar enquete:", err);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// DELETE uma enquete
app.delete("/api/polls/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const poll = await Poll.findByPk(id);
    if (!poll) {
      return res.status(404).json({ message: "Enquete não encontrada" });
    }

    // Busca todas as opções desta enquete
    const options = await Option.findAll({ where: { PollId: id } });
    const optionIds = options.map((opt) => opt.id);

    // Deleta votos das opções
    if (optionIds.length > 0) {
      await Vote.destroy({ where: { OptionId: optionIds } });
    }

    // Deleta opções
    await Option.destroy({ where: { PollId: id } });

    // Deleta enquete
    await poll.destroy();

    res.json({ message: "Enquete deletada com sucesso" });
  } catch (err) {
    console.error("Erro ao deletar enquete:", err);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// POST um voto
app.post("/api/polls/:id/vote", async (req, res) => {
  try {
    const { id } = req.params;
    const { optionId } = req.body;

    if (!optionId) {
      return res.status(400).json({ message: "OptionId é obrigatório" });
    }

    const poll = await Poll.findByPk(id);
    if (!poll) {
      return res.status(404).json({ message: "Enquete não encontrada" });
    }

    const option = await Option.findByPk(optionId);
    if (!option || option.PollId !== parseInt(id)) {
      return res.status(404).json({
        message: "Opção não encontrada ou não pertence a esta enquete",
      });
    }

    // Verifica se a enquete está ativa
    const now = new Date();
    if (now < new Date(poll.startDate) || now > new Date(poll.endDate)) {
      return res.status(400).json({ message: "Enquete não está ativa" });
    }

    // Cria o voto
    const vote = await Vote.create({ OptionId: optionId });

    // Emite atualização em tempo real
    const results = await getResults(id);
    io.emit("updateVotes", { pollId: id, results });

    res.status(201).json({ message: "Voto registrado com sucesso", vote });
  } catch (err) {
    console.error("Erro ao registrar voto:", err);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// GET resultados de uma enquete
app.get("/api/polls/:id/results", async (req, res) => {
  try {
    const { id } = req.params;

    const poll = await Poll.findByPk(id, { include: Option });
    if (!poll) {
      return res.status(404).json({ message: "Enquete não encontrada" });
    }

    const results = await getResults(id);
    res.json({ poll, results });
  } catch (err) {
    console.error("Erro ao buscar resultados:", err);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Função auxiliar para obter resultados
async function getResults(pollId) {
  const options = await Option.findAll({ where: { PollId: pollId } });
  const results = {};

  for (const option of options) {
    const voteCount = await Vote.count({ where: { OptionId: option.id } });
    results[option.id] = {
      text: option.text,
      votes: voteCount,
    };
  }

  return results;
}

io.on("connection", (socket) => {
  console.log("Usuário conectado");
  socket.on("disconnect", () => {
    console.log("Usuário desconectado");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
