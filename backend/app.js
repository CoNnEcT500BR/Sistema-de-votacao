const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/database");
const Poll = require("./models/Poll");
const Option = require("./models/Option");
const Vote = require("./models/Vote");

// Imports dos modules refatorados
const { initializeDatabaseIfNeeded } = require("./utils/database");
const setupPollRoutes = require("./routes/polls");
const setupSocketHandlers = require("./handlers/socketHandlers");

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

// Inicializar banco antes de iniciar servidor
initializeDatabaseIfNeeded();

// Setup de rotas
setupPollRoutes(app, io);

// Setup de listeners de WebSocket
setupSocketHandlers(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
