const express = require("express");
const Poll = require("../models/Poll");
const Option = require("../models/Option");
const Vote = require("../models/Vote");
const { getResults } = require("../utils/pollUtils");

module.exports = function setupPollRoutes(app, io) {
  // GET todas as enquetes
  app.get("/api/polls", async (req, res) => {
    try {
      const polls = await Poll.findAll({
        include: Option,
        raw: false,
        order: [["id", "DESC"], [Option, "order", "ASC"]],
      });
      res.json(polls);
    } catch (err) {
      console.error("Erro ao buscar polls:", err);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  });

  // POST uma nova enquete
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

      // Cria opções associadas com ordem
      const optionPromises = options.map((opt, index) =>
        Option.create({ text: opt, PollId: poll.id, order: index })
      );
      await Promise.all(optionPromises);

      const pollWithOptions = await Poll.findByPk(poll.id, { 
        include: Option,
        order: [[Option, "order", "ASC"]],
      });

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
      const poll = await Poll.findByPk(id, { 
        include: Option,
        order: [[Option, "order", "ASC"]],
      });

      if (!poll) {
        return res.status(404).json({ message: "Enquete não encontrada" });
      }

      res.json(poll);
    } catch (err) {
      console.error("Erro ao buscar enquete:", err);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  });

  // PUT (atualizar) uma enquete
  app.put("/api/polls/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { title, startDate, endDate, options } = req.body;

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

      // Atualizar opções se fornecidas E forem válidas
      if (options && Array.isArray(options) && options.length >= 3) {
        // Validar e limpar opções
        const validOptions = options
          .map((opt) => (typeof opt === 'string' ? opt : opt.text))
          .map((text) => text.trim())
          .filter((text) => text);
        
        if (validOptions.length >= 3) {
          // Obter opções atuais
          const oldOptions = await Option.findAll({ where: { PollId: id } });
          const oldOptionTexts = new Set(oldOptions.map((opt) => opt.text));
          const newOptionTexts = new Set(validOptions);

          // Deletar opções que foram removidas
          for (const oldOption of oldOptions) {
            if (!newOptionTexts.has(oldOption.text)) {
              await oldOption.destroy();
            }
          }

          // Criar novas opções ou atualizar existentes, mantendo a ordem
          for (let index = 0; index < validOptions.length; index++) {
            const newText = validOptions[index];
            const existingOption = oldOptions.find((opt) => opt.text === newText);
            if (!existingOption) {
              // Criar nova opção com a ordem especificada
              await Option.create({ text: newText, PollId: id, order: index });
            } else {
              // Atualizar a ordem da opção existente
              await existingOption.update({ order: index });
            }
          }
        } else {
          return res
            .status(400)
            .json({ message: "Mínimo de 3 opções válidas e preenchidas é obrigatório" });
        }
      }

      await poll.save();
      const pollWithOptions = await Poll.findByPk(id, { 
        include: Option,
        order: [[Option, "order", "ASC"]],
      });

      // Emitir evento de atualização via WebSocket
      io.emit("pollsUpdated");

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

      // Deleta enquete (CASCADE cuida do resto)
      await poll.destroy();

      // Emitir evento de atualização via WebSocket
      io.emit("pollsUpdated");

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
};
