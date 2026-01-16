# 📊 Mapa Visual do Sistema de Votação

## 🏗️ Arquitetura Refatorada

### Backend - Estrutura de Camadas

```
┌─────────────────────────────────────────────────────┐
│                   app.js (Entrada)                  │
│           Express + Socket.io + CORS                │
└────────────┬─────────────────────────────────────┬──┘
             │                                     │
      ┌──────▼──────┐                      ┌──────▼──────┐
      │   Routes    │                      │  Handlers   │
      │ (polls.js)  │                      │ (Socket.io) │
      │ HTTP APIs   │                      │ Real-time   │
      └──────┬──────┘                      └──────┬──────┘
             │                                     │
      ┌──────▼──────────────────────────────────────▼──────┐
      │            Modelos (Models)                        │
      │  Poll.js | Option.js | Vote.js                   │
      │         (Sequelize ORM)                           │
      └──────────────────┬───────────────────────────────┘
                         │
      ┌──────────────────▼───────────────────────────────┐
      │        Banco de Dados (MySQL)                   │
      │  polls | options | votes                         │
      └────────────────────────────────────────────────┘
```

### Frontend - Estrutura de Componentes

```
┌─────────────────────────────────────────────────┐
│           App.jsx (Componente Raiz)             │
└────────┬────────────────────────┬──────────────┘
         │                        │
    ┌────▼────┐          ┌────────▼────┐
    │PollList │          │ PollDetail  │
    │         │          │             │
    │Listar   │          │Votar        │
    │enquetes │          │Resultados   │
    └────┬────┘          └────┬────────┘
         │                    │
         │              ┌─────▼──────┐
         │              │ PollForm   │
         │              │            │
         │              │Criar/Editar│
         │              └────────────┘
         │
    ┌────▼────────────────────────────┐
    │       Hook: usePollsData        │
    │  Gerencia estado das enquetes  │
    └────┬───────────────────────────┘
         │
    ┌────▼──────────────────────────────┐
    │   Utils: pollAPI + socketClient   │
    │ Comunicação com Backend            │
    └───────────────────────────────────┘
```

---

## 🔄 Fluxo de Execução

### Ao rodar `npm run setup:db`

```
┌─────────────────────────────────────────┐
│  npm run setup:db                       │
│  (Backend - inicializar + popular)      │
└────────────────┬──────────────────────┘
                 │
                 ├─→ npm run init:db
                 │   ├─ config/database.js (conectar)
                 │   ├─ models/ (definir esquema)
                 │   ├─ utils/database.js (inicializar)
                 │   └─ ✅ Estrutura criada
                 │
                 ├─→ npm run seed:db
                 │   ├─ scripts/seed-db.js
                 │   ├─ Criar 3 enquetes
                 │   ├─ Adicionar opções
                 │   ├─ Adicionar votos
                 │   └─ ✅ Dados populados
                 │
                 └─→ ✅ Banco pronto para usar!
```

### Ao rodar `npm start` (Backend)

```
┌──────────────────────┐
│   npm start          │
│  (Backend server)    │
└─────────┬────────────┘
          │
    ┌─────▼──────────┐
    │ app.js inicia  │
    │ - Express      │
    │ - Socket.io    │
    └─────┬──────────┘
          │
    ┌─────▼──────────────────────┐
    │ Configurações carregadas   │
    │ - config/database.js       │
    │ - models/                  │
    │ - routes/polls.js          │
    │ - handlers/socketHandlers  │
    └─────┬──────────────────────┘
          │
    ┌─────▼──────────────────────┐
    │ utils/database.js          │
    │ Sincronizar com banco      │
    └─────┬──────────────────────┘
          │
    ┌─────▼──────────────────────┐
    │ Servidor na porta 5000 ✅  │
    │ Socket.io pronto ✅        │
    └────────────────────────────┘
```

### Ao rodar `npm run dev` (Frontend)

```
┌──────────────────────┐
│   npm run dev        │
│  (Frontend - Vite)   │
└─────────┬────────────┘
          │
    ┌─────▼──────────────────────┐
    │ Vite inicia na porta 5173   │
    └─────┬──────────────────────┘
          │
    ┌─────▼──────────────────────┐
    │ src/main.jsx carregado      │
    │ React 19.2.0 inicializado   │
    └─────┬──────────────────────┘
          │
    ┌─────▼──────────────────────┐
    │ App.jsx renderizado         │
    │ Conexão Socket.io           │
    │ usePollsData hook           │
    └─────┬──────────────────────┘
          │
    ┌─────▼──────────────────────┐
    │ Aplicação pronta! ✅        │
    │ http://localhost:5173       │
    └────────────────────────────┘
```

---

## 📱 Scripts e Quando Usar

```
PRIMEIRO USO:
  npm run setup:db      ← FAZER ISTO PRIMEIRO!
                          (init + seed juntos)

DESENVOLVIMENTO:
  npm run dev           ← Servidor com auto-reload

SE ALGO DER ERRADO:
  npm run reset:db      ← Deletar tudo
  npm run seed:db       ← Adicionar novos dados
  npm run dev           ← Recomeçar

CUSTOMIZAR:
  npm run init:db       ← Só criar estrutura
  (adicione dados manualmente depois)
```

---

## 🗄️ Banco de Dados Criado

```
DATABASE: voting_system
│
├─ TABLE: polls
│  ├─ id (Integer, Primary Key)
│  ├─ title (String, NOT NULL)
│  ├─ description (String)
│  ├─ startDate (DateTime)
│  ├─ endDate (DateTime)
│  ├─ createdAt (DateTime, auto)
│  └─ updatedAt (DateTime, auto)
│
├─ TABLE: options
│  ├─ id (Integer, Primary Key)
│  ├─ text (String, NOT NULL)
│  ├─ pollId (Integer, Foreign Key → polls.id)
│  ├─ createdAt (DateTime, auto)
│  └─ updatedAt (DateTime, auto)
│
└─ TABLE: votes
   ├─ id (Integer, Primary Key)
   ├─ optionId (Integer, Foreign Key → options.id)
   ├─ createdAt (DateTime, auto)
   └─ updatedAt (DateTime, auto)

Relacionamentos:
  Poll.hasMany(Option, onDelete: CASCADE)
  Option.belongsTo(Poll)
  Option.hasMany(Vote, onDelete: CASCADE)
  Vote.belongsTo(Option)
```

---

## 🎯 Estados das Enquetes

```
NOT_STARTED (Não iniciada)
├─ Data início ainda não chegou
├─ Você vê a enquete
└─ Você NÃO pode votar ❌

ACTIVE (Em andamento)
├─ Dentro do período
├─ Você vê a enquete
└─ Você PODE votar ✅

FINISHED (Finalizada)
├─ Data fim passou
├─ Você vê a enquete
├─ Você NÃO pode votar ❌
└─ Você VÊ os resultados ✅
```

---

## 🔄 Fluxo de Votação em Tempo Real

```
┌─────────────┐
│  Cliente    │         ┌──────────────┐
│ (Browser)   │────────→│   Backend    │
│             │         │ (Express)    │
└─────────────┘         └──────┬───────┘
      ↑                        │
      │                   ┌────▼──────────────┐
      │                   │ routes/polls.js   │
      │                   │ POST /polls/:id/  │
      │                   │      vote         │
      │                   └────┬──────────────┘
      │                        │
      │                   ┌────▼──────────────┐
      │                   │ models/Vote.js    │
      │                   │ Salvar voto no BD │
      │                   └────┬──────────────┘
      │                        │
      │                   ┌────▼──────────────┐
      │                   │ handlers/socket   │
      │                   │ Broadcast para    │
      │                   │ todos os clientes │
      │                   └────┬──────────────┘
      │                        │
      └────────────────────────┘
         Socket.io emit
       (atualização em tempo real)
```

---

## 💻 Linhas de Comando Úteis

```bash
# Setup rápido (recomendado)
npm run setup:db

# Inicializar banco vazio
npm run init:db

# Resetar tudo
npm run reset:db

# Popular com dados
npm run seed:db

# Rodar servidor
npm start
npm run dev  # com auto-reload

# Verificar banco
mysql -u root voting_system
> SELECT * FROM polls;
```

---

## 🔐 Confirmações de Segurança

### `npm run reset:db` é SEGURO porque:

```
⚠️  AVISO: Este comando irá DELETAR TODOS os dados do banco!

Digite 'sim' para confirmar o reset do banco:

↓

✓ Só deleta se digitar 'sim'
✓ Qualquer outro input cancela
✓ Sem deletar acidental!
```

---

## 📊 Dados de Teste Criados

Enquete 1: **Em Andamento** ✅

```
Título: Qual é sua linguagem favorita?
Opções:
  - JavaScript / TypeScript
  - Python
  - Java
  - C / C++
Status: Votação ativa (dentro do período)
```

Enquete 2: **Não Iniciada** ⏳

```
Título: Qual SO você usa?
Opções:
  - Windows
  - macOS
  - Linux
  - Outro
Status: Não pode votar ainda (antes da data início)
```

Enquete 3: **Finalizada** ✓

```
Título: Melhor framework web?
Opções com votos:
  - React: 10 votos ✓
  - Vue.js: 7 votos ✓
  - Angular: 5 votos ✓
  - Svelte: 3 votos ✓
Status: Mostra resultados apenas (passou da data fim)
```

---

## 🚀 Fluxo Completo do Projeto

```
1. INSTALAR
   ├─ cd backend
   ├─ npm install
   ├─ cd ../frontend
   └─ npm install

2. CONFIGURAR
   ├─ Editar backend/.env
   ├─ Definir credenciais MySQL
   └─ (Frontend usa example.env como template)

3. INICIALIZAR BANCO
   ├─ cd backend
   └─ npm run setup:db

4. INICIAR SERVIDORES
   ├─ Terminal 1: npm start (backend, porta 5000)
   ├─ Terminal 2: npm run dev (frontend, porta 5173)
   └─ Abrir http://localhost:5173 no navegador

5. USAR APLICAÇÃO
   ├─ Ver enquetes (GET /api/polls)
   ├─ Criar nova enquete (POST /api/polls)
   ├─ Votar (POST /api/polls/:id/vote)
   ├─ Ver resultados (GET /api/polls/:id/results)
   ├─ Editar enquete (PUT /api/polls/:id)
   └─ Deletar enquete (DELETE /api/polls/:id)

6. QUANDO PRECISAR RESETAR
   ├─ npm run reset:db
   ├─ npm run seed:db
   └─ npm run dev
```

---

## 🆘 Troubleshooting em Diagrama

```
Erro: Connection refused
└─→ MySQL não está rodando
    └─→ Iniciar MySQL (Services em Windows)

Erro: Access denied
└─→ Senha/usuário incorreto em .env
    └─→ Verificar credenciais
    └─→ npm run init:db novamente

Erro: Database already exists
└─→ Isso é NORMAL
    └─→ Script continua funcionando

Erro: Port already in use
└─→ Outro processo na porta 5000
    └─→ Mudar PORT em .env
    └─→ Ou matar processo anterior

Dados desaparecem
└─→ npm run reset:db foi executado
    └─→ Executar npm run seed:db
    └─→ (dados não recuperáveis)

Frontend não carrega
└─→ Backend não está rodando
    └─→ Abrir outro terminal
    └─→ cd backend && npm start

Votação não funciona em tempo real
└─→ Socket.io desconectado
    └─→ Verificar utils/socketClient.js
    └─→ Verificar handlers/socketHandlers.js
```

---

## 📚 Estrutura de Arquivos Backend

```
backend/
├── app.js                           # Entrada principal
│   ├─ Carrega Express + Socket.io
│   ├─ Importa routes e handlers
│   └─ Inicia servidor na porta 5000
│
├── config/
│   └─ database.js                   # Config Sequelize
│
├── models/
│   ├─ Poll.js                       # Modelo enquete
│   ├─ Option.js                     # Modelo opção
│   └─ Vote.js                       # Modelo voto
│
├── routes/
│   └─ polls.js                      # API REST endpoints
│       ├─ GET /api/polls
│       ├─ POST /api/polls
│       ├─ PUT /api/polls/:id
│       ├─ DELETE /api/polls/:id
│       └─ POST /api/polls/:id/vote
│
├── handlers/
│   └─ socketHandlers.js             # WebSocket listeners
│       ├─ connection
│       ├─ disconnect
│       └─ custom events
│
├── utils/
│   ├─ database.js                   # Helper database
│   │   └─ initializeDatabaseIfNeeded()
│   └─ pollUtils.js                  # Helper polls
│
├── scripts/
│   ├─ init-db.js                    # Inicializar DB
│   ├─ reset-db.js                   # Resetar DB
│   ├─ seed-db.js                    # Popular DB
│   └─ check-db.js                   # Verificar DB
│
├── package.json
├── .env
└── .gitignore
```

---

## 📚 Estrutura de Arquivos Frontend

```
frontend/
├── src/
│   ├── App.jsx                      # Componente raiz
│   ├── main.jsx                     # Entrada React
│   │
│   ├── components/
│   │   ├─ PollList.jsx              # Listar enquetes
│   │   ├─ PollDetail.jsx            # Detalhes/votação
│   │   ├─ PollForm.jsx              # Criar/editar
│   │   └─ ConfirmationModal.jsx     # Modal confirmação
│   │
│   ├── hooks/
│   │   └─ usePollsData.js           # Hook customizado
│   │
│   ├── utils/
│   │   ├─ pollAPI.js                # Chamadas HTTP
│   │   └─ socketClient.js           # Setup WebSocket
│   │
│   ├── styles/
│   │   ├─ global.css
│   │   ├─ App.module.css
│   │   ├─ PollList.module.css
│   │   ├─ PollDetail.module.css
│   │   ├─ PollForm.module.css
│   │   └─ ConfirmationModal.module.css
│   │
│   └── assets/
│
├── public/
├── index.html                       # HTML principal
├── vite.config.js                   # Config Vite
├── eslint.config.js                 # Config ESLint
├── package.json
├── example.env                      # Template .env
├── .env                             # Variáveis
└── .gitignore
```

---

## 🌟 Diferenciais

✨ **Um comando para setup** - `npm run setup:db`  
✨ **Seguro** - Pede confirmação antes de deletar  
✨ **Rápido** - Setup em menos de 1 minuto  
✨ **Flexível** - Pode usar init, seed ou reset separadamente  
✨ **Educativo** - Código bem comentado  
✨ **Banco de Dados** - Criação automática de dados

---

## 🔗 Links Rápidos

- [SETUP.md](./SETUP.md) - Instruções completas
- [README.md](./README.md) - Documentação do projeto
- [backend/scripts/README.md](./backend/scripts/README.md) - Scripts detalhados

---

## 🎉 Próximo Passo

```bash
cd backend
npm run setup:db    # Rodar isto AGORA!
npm start           # Depois isto!
```

**E pronto! Você tem um sistema de votação funcionando! 🚀**
