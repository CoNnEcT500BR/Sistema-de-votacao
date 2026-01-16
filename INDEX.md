# 📑 Índice de Documentação do Sistema de Votação

## 🎯 Comece Por Aqui

Se você está testando o projeto, comece por este arquivo e escolha seu nível:

### ⚡ **Quero começar AGORA** (5 minutos)

👉 Leia: **[QUICK-START.md](./QUICK-START.md)**

Você vai:

- ✅ Fazer setup em um comando
- ✅ Ter dados prontos para usar
- ✅ Estar rodando em 5 minutos

### 📖 **Quero entender tudo** (30 minutos)

👉 Leia: **[SETUP.md](./SETUP.md)** e **[README.md](./README.md)**

Você vai:

- ✅ Entender a arquitetura
- ✅ Saber como configurar tudo
- ✅ Aprender os conceitos

### 🔧 **Quero customizar** (1+ hora)

👉 Leia: **[backend/scripts/README.md](./backend/scripts/README.md)**

Você vai:

- ✅ Modificar dados de teste
- ✅ Criar scripts próprios
- ✅ Dominar completamente

---

## 📚 Documentação Completa

### 🚀 Configuração & Setup

| Arquivo                                  | Para Quem                       | Tempo  |
| ---------------------------------------- | ------------------------------- | ------ |
| [QUICK-START.md](./QUICK-START.md)       | Quem quer começar logo          | 5 min  |
| [SETUP.md](./SETUP.md)                   | Quem quer instruções detalhadas | 30 min |
| [DATABASE-SETUP.md](./DATABASE-SETUP.md) | Quem quer entender o banco      | 15 min |
| [SYSTEM-MAP.md](./SYSTEM-MAP.md)         | Quem quer ver diagrama visual   | 10 min |

### 🎯 Projeto & Funcionalidades

| Arquivo                                                  | Para Quem                 | Tempo  |
| -------------------------------------------------------- | ------------------------- | ------ |
| [README.md](./README.md)                                 | Quem quer visão geral     | 20 min |
| [README.md - Exemplos de Requisições](./README.md#-exemplos-de-requisições) | Quem quer testar a API | 10 min |
| [backend/scripts/README.md](./backend/scripts/README.md) | Quem quer usar scripts    | 15 min |
| [backend/scripts/README.md](./backend/scripts/README.md) | Guia completo | 1 hora |

---

## 📌 Seções Principais do README.md

1. **[🔌 API Endpoints](./README.md#-api-endpoints)** - Lista completa de endpoints
2. **[📋 Exemplos de Requisições](./README.md#-exemplos-de-requisições)** - Como usar GET, POST, DELETE
3. **[✅ Validações Obrigatórias](./README.md#-validações-obrigatórias)** - Regras de validação
4. **[🔴 Códigos de Resposta HTTP](./README.md#-códigos-de-resposta-http)** - Status codes esperados

---

## 🗂️ O Que Você Tem

```
📁 Sistema de Votação
│
├─ 📄 QUICK-START.md          ← COMEÇAR AQUI!
├─ 📄 SETUP.md                ← Instruções completas
├─ 📄 README.md               ← Documentação projeto
├─ 📄 DATABASE-SETUP.md       ← Resumo do banco
├─ 📄 SYSTEM-MAP.md           ← Diagrama visual
├─ 📄 INDEX.md                ← Este arquivo
│
└─ 📁 backend/
   └─ 📁 scripts/
      ├─ 📄 init-db.js        ← Script de inicialização
      ├─ 📄 reset-db.js       ← Script de reset
      ├─ 📄 seed-db.js        ← Script de população
      └─ 📄 README.md         ← Documentação completa
```

---

## 🔍 Encontre Informações Rapidamente

### "Como começar?"

👉 [QUICK-START.md](./QUICK-START.md) - Seção "Quick Start"

### "Como testar a API?"

👉 [README.md - Exemplos de Requisições](./README.md#-exemplos-de-requisições) - Exemplos curl/JavaScript  
👉 [SETUP.md - Testes Rápidos da API](./SETUP.md#-testes-rápidos-da-api) - Comandos para testar

### "Qual porta o servidor usa?"

👉 [README.md](./README.md) - Seção "Quick Start" ou [SETUP.md](./SETUP.md)

### "Como resetar o banco?"

👉 [DATABASE-SETUP.md](./DATABASE-SETUP.md) - Seção "Scripts npm"  
👉 [backend/scripts/README.md](./backend/scripts/README.md) - Seção "Troubleshooting"

### "Como mudar dados de teste?"

👉 [backend/scripts/README.md](./backend/scripts/README.md) - Seção "FAQ"

### "Quais são os códigos de erro da API?"

👉 [README.md - Códigos de Resposta HTTP](./README.md#-códigos-de-resposta-http) - Tabela completa

### "Qual é a estrutura de arquivos?"

👉 [README.md](./README.md) - Seção "Estrutura do Projeto"

### "Como funciona a votação em tempo real?"

👉 [README.md](./README.md) - Seção "Fluxo de Votação"

### "Quais endpoints existem?"

👉 [README.md](./README.md) - Seção "API Endpoints"

### "Deu erro, o que fazer?"

👉 [SETUP.md](./SETUP.md) - Seção "Troubleshooting"  
👉 [backend/scripts/README.md](./backend/scripts/README.md) - Seção "Troubleshooting"

---

## 🎯 Casos de Uso

### ✅ "Quero usar o sistema agora"

1. Ler: [QUICK-START.md](./QUICK-START.md)
2. Fazer: `npm run setup:db`
3. Rodar: `npm start`

### ✅ "Quero entender como funciona"

1. Ler: [README.md](./README.md)
2. Ler: [SETUP.md](./SETUP.md)
3. Explorar: Código do projeto

### ✅ "Quero customizar os dados de teste"

1. Ler: [backend/scripts/README.md](./backend/scripts/README.md)
2. Editar: `backend/scripts/seed-db.js`
3. Rodar: `npm run seed:db`

### ✅ "Quero compartilhar com outros devs"

1. Compartilhar: Toda a pasta
2. Eles leem: [SETUP.md](./SETUP.md)
3. Eles rodam: `npm run setup:db`

### ✅ "Quero fazer deploy"

1. Ler: [README.md](./README.md)
2. Seguir: [SETUP.md](./SETUP.md)
3. Configurar: `.env` com credenciais de produção

---

## 📊 Resumo dos Scripts

| Script          | O que faz            | Comando            |
| --------------- | -------------------- | ------------------ |
| **init-db.js**  | Cria banco + tabelas | `npm run init:db`  |
| **seed-db.js**  | Adiciona dados teste | `npm run seed:db`  |
| **reset-db.js** | Deleta tudo e recria | `npm run reset:db` |
| **setup**       | init + seed juntos   | `npm run setup:db` |

---

## 🎉 Resumo Rápido

### Para Começar:

```bash
npm run setup:db    # Setup completo
npm start           # Servidor
npm run dev         # Frontend
```

### Para Resetar:

```bash
npm run reset:db    # Deletar dados
npm run seed:db     # Adicionar novos
```

---

## 🔗 Links Principais

| Recurso      | Link                                                     |
| ------------ | -------------------------------------------------------- |
| Quick Start  | [QUICK-START.md](./QUICK-START.md)                       |
| Configuração | [SETUP.md](./SETUP.md)                                   |
| Documentação | [README.md](./README.md)                                 |
| Scripts      | [backend/scripts/README.md](./backend/scripts/README.md) |
| Mapa Visual  | [SYSTEM-MAP.md](./SYSTEM-MAP.md)                         |

---

## 🎯 Próximo Passo

### Se você **nunca usou o projeto**:

1. Abra [QUICK-START.md](./QUICK-START.md)
2. Siga os 5 passos
3. Pronto! Sistema rodando

### Se você **quer aprender tudo**:

1. Leia [README.md](./README.md)
2. Leia [SETUP.md](./SETUP.md)
3. Explore o código
4. Leia [backend/scripts/README.md](./backend/scripts/README.md)

### Se você **tem problemas**:

1. Procure em [Troubleshooting](./SETUP.md#-troubleshooting)
2. Procure em [SYSTEM-MAP.md](./SYSTEM-MAP.md)
3. Leia [backend/scripts/README.md](./backend/scripts/README.md#-troubleshooting)

---

## 📞 Sumário de Arquivos

| Arquivo                   | O que é               | Quando ler          |
| ------------------------- | --------------------- | ------------------- |
| INDEX.md                  | Este arquivo          | Sempre (referência) |
| QUICK-START.md            | Para começar logo     | Primeira vez        |
| SETUP.md                  | Instruções detalhadas | Setup inicial       |
| README.md                 | Documentação completa | Aprendizado         |
| DATABASE-SETUP.md         | Resumo do sistema     | Referência rápida   |
| SYSTEM-MAP.md             | Diagrama visual       | Referência visual   |
| backend/scripts/README.md | Docs dos scripts      | Usar scripts        |
| backend/scripts/README.md  | Docs e guia completo  | Usar e customizar   |
