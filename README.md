# 🗳️ Sistema de Votação

## ✨ Características

### 🎯 Funcionalidades Principais

- ✅ **Criar Enquetes** - Formulário intuitivo com opções dinâmicas
- ✅ **Votar em Tempo Real** - Resultados atualizados instantaneamente via WebSocket
- ✅ **Gerenciar Enquetes** - Editar e deletar enquetes facilmente
- ✅ **Filtrar por Status** - Não iniciada, Em andamento, Finalizada
- ✅ **Contar Votos** - Visualizar número de votos ao lado de cada opção
- ✅ **Reordenar Opções** - Drag-and-drop para reorganizar opções sem perder votos
- ✅ **Preservar Dados ao Editar** - Votos e datas são mantidos ao editar
- ✅ **Suporte Unicode** - Emojis e caracteres especiais funcionam perfeitamente

### 🎨 Design

- 🌈 Interface moderna com gradientes e sombras
- 📱 Totalmente responsivo (Desktop, Tablet, Mobile)
- ⚡ Animações suaves e transições elegantes
- 🎯 Componentes bem estruturados e reutilizáveis
- ♿ Acessibilidade focada (focus states, keyboard navigation)

### 🔧 Tecnologias

**Backend:**

- Node.js com Express.js
- Sequelize ORM
- MySQL Database
- Socket.io para comunicação em tempo real
- CORS habilitado
- UTF-8 completo

**Frontend:**

- React 19.2.0
- Vite 7.3.1 (build tool)
- CSS Modules com Flexbox
- Axios para requisições HTTP
- Socket.io-client para WebSocket

---

## 🚀 Quick Start

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- MySQL 5.7+

### Instalação Rápida

```bash
# 1. Ir para backend e instalar
cd backend
npm install

# 2. Configurar .env com credenciais MySQL
# DB_HOST=localhost
# DB_USER=root
# DB_PASS=sua_senha
# DB_NAME=voting_system
# DB_PORT=3306
# PORT=5000

# 3. Inicializar e popular banco de dados
npm run setup:db

# 4. Iniciar servidor
npm start

# 5. Configurar .env do frontend com a localização do servidor
# VITE_API_URL=http://localhost:5000
# VITE_API_SOCKET_URL=http://localhost:5000

# 6. Em outro terminal - Frontend
cd frontend
npm install
npm run dev

# 7. Abrir navegador
# http://localhost:5173
```

### Configuração Detalhada

Veja [SETUP.md](./SETUP.md) para instruções completas de configuração.

---

## 📁 Estrutura do Projeto

```
root/
│
├── 📦 backend/
│   ├── 📂 config/
│   │   └── database.js          # Configuração Sequelize
│   ├── 📂 handlers/
│   │   └── socketHandlers.js    # Handlers de WebSocket
│   ├── 📂 models/
│   │   ├── index.js             # Index de Associação
│   │   ├── Poll.js              # Modelo de enquete
│   │   ├── Option.js            # Modelo de opção
│   │   └── Vote.js              # Modelo de voto
│   ├── 📂 routes/
│   │   └── polls.js             # Rotas das enquetes
│   ├── 📂 scripts/              # Scripts utilitários
│   │   ├── init-db.js           # Inicializar BD
│   │   ├── reset-db.js          # Resetar BD
│   │   ├── seed-db.js           # Popular BD
│   │   ├── check-db.js          # Verifica o BD
│   │   └── README.md            # Guia completo de scripts
│   ├── 📂 utils/
│   │   └── database.js          # Utilitários de banco de dados
│   │
│   ├── app.js                   # Servidor Express com Socket.io
│   ├── package.json
│   └── .env                     # Variáveis de ambiente
│
├── 🎨 frontend/
│   ├── 📂 public/
│   ├── 📂 src/
│   │   ├── App.jsx              # Componente principal
│   │   ├── main.jsx
│   │   ├── 📂 assets/
│   │   ├── 📂 components/
│   │   │   └── ConfirmationModal.jsx  # Modal de confirmação
│   │   │   ├── PollDetail.jsx   # Detalhes e votação
│   │   │   ├── PollForm.jsx     # Criar/editar enquete
│   │   │   ├── PollList.jsx     # Lista de enquetes
│   │   ├── 📂 hooks/
│   │   │   └── usePollsData.js  # Hook customizado para dados
│   │   ├── 📂 styles/
│   │   │   ├── App.module.css
│   │   │   └── ConfirmationModal.module.css
│   │   │   ├── global.css
│   │   │   ├── PollDetail.module.css
│   │   │   ├── PollForm.module.css
│   │   │   ├── PollList.module.css
│   │   └── 📂 utils/
│   │       ├── pollAPI.js       # Funções da API
│   │       └── socketClient.js  # Configuração WebSocket
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── .env                     # Variáveis de ambiente
│
├── SETUP.md                     # Guia de configuração
├── README.md                    # Este arquivo
├── INDEX.md                     # Índice
├── QUICK-START.md               # Guia rápido
├── SYSTEM-MAP.md                # Diagrama visual
├── DATABASE-SETUP.md            # Resumo do BD
├── index.html                   # Índice visual
└── .gitignore
```

---

## 🔌 API Endpoints

### Enquetes (Polls)

| Método | Endpoint         | Descrição                 |
| ------ | ---------------- | ------------------------- |
| GET    | `/api/polls`     | Listar todas as enquetes  |
| POST   | `/api/polls`     | Criar nova enquete        |
| GET    | `/api/polls/:id` | Obter detalhes da enquete |
| PUT    | `/api/polls/:id` | Atualizar enquete         |
| DELETE | `/api/polls/:id` | Deletar enquete           |

### Votação

| Método | Endpoint                 | Descrição                   |
| ------ | ------------------------ | --------------------------- |
| POST   | `/api/polls/:id/vote`    | Votar em uma opção          |
| GET    | `/api/polls/:id/results` | Obter resultados da enquete |

---

## 📋 Exemplos de Requisições

### GET /api/polls - Listar todas as enquetes

**Requisição:**

```bash
curl -X GET http://localhost:5000/api/polls
```

**Resposta (200 OK):**

```json
{
  "id": 1,
  "title": "Qual é sua linguagem favorita?",
  "description": null,
  "startDate": "2026-01-17T10:00:00.000Z",
  "endDate": "2026-01-24T10:00:00.000Z",
  "options": [
    {
      "id": 1,
      "text": "JavaScript",
      "order": 0,
      "pollId": 1,
      "votes": []
    },
    {
      "id": 2,
      "text": "Python",
      "order": 1,
      "pollId": 1,
      "votes": []
    },
    {
      "id": 3,
      "text": "Java",
      "order": 2,
      "pollId": 1,
      "votes": []
    }
  ]
}
```

---

### POST /api/polls - Criar nova enquete

**Requisição:**

```bash
curl -X POST http://localhost:5000/api/polls \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Qual é sua linguagem favorita?",
    "startDate": "2026-01-17T10:00:00Z",
    "endDate": "2026-01-24T10:00:00Z",
    "options": [
      "JavaScript",
      "Python",
      "Java"
    ]
  }'
```

**Requisição em JavaScript (Fetch):**

```javascript
const response = await fetch("http://localhost:5000/api/polls", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "Qual é sua linguagem favorita?",
    startDate: "2026-01-17T10:00:00Z",
    endDate: "2026-01-24T10:00:00Z",
    options: ["JavaScript", "Python", "Java"],
  }),
});
const data = await response.json();
```

**Resposta (201 Created):**

```json
{
  "message": "Enquete criada com sucesso",
  "poll": {
    "id": 4,
    "title": "Qual é sua linguagem favorita?",
    "description": null,
    "startDate": "2026-01-17T10:00:00.000Z",
    "endDate": "2026-01-24T10:00:00.000Z",
    "options": [
      {
        "id": 13,
        "text": "JavaScript",
        "order": 0,
        "pollId": 4
      },
      {
        "id": 14,
        "text": "Java",
        "order": 2,
        "pollId": 4
      },
      {
        "id": 15,
        "text": "Python",
        "order": 1,
        "pollId": 4
      }
    ]
  }
}
```

---

### PUT /api/polls/:id - Atualizar enquete

**Requisição (Reordenar Opções):**

```bash
curl -X PUT http://localhost:5000/api/polls/1 \
  -H "Content-Type: application/json" \
  -d '{
    "id": 4,
    "title": "Qual é sua linguagem favorita?",
    "description": null,
    "startDate": "2026-01-17T10:00:00.000Z",
    "endDate": "2026-01-24T10:00:00.000Z",
    "options": [
        {
            "id": 13,
            "text": "JavaScript",
            "order": 0
        },
        {
            "id": 15,
            "text": "Python",
            "order": 1
        },
        {
            "id": 14,
            "text": "Java",
            "order": 2
        },
        {
            "text": "C#",
            "order": 3
        }
    ]
}'
```

**Requisição em JavaScript (Reordenar):**

```javascript
const response = await fetch("http://localhost:5000/api/polls/1", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "Qual é sua linguagem favorita?",
    startDate: "2026-01-17T10:00:000Z",
    endDate: "2026-01-24T10:00:000Z",
    options: [
      { id: 13, text: "JavaScript", order: 0 },
      { id: 15, text: "Python", order: 1 },
      { id: 14, text: "Java", order: 2 },
      { text: "C#", order: 3 },
    ],
  }),
});

const data = await response.json();
```

**Resposta (200 OK):**

```json
{
  "message": "Enquete atualizada com sucesso",
  "poll": {
    "id": 4,
    "title": "Qual é sua linguagem favorita?",
    "description": null,
    "startDate": "2026-01-17T10:00:00.000Z",
    "endDate": "2026-01-24T10:00:00.000Z",
    "options": [
      {
        "id": 13,
        "text": "JavaScript",
        "order": 0,
        "pollId": 4
      },
      {
        "id": 15,
        "text": "Python",
        "order": 1,
        "pollId": 4
      },
      {
        "id": 14,
        "text": "Java",
        "order": 2,
        "pollId": 4
      },
      {
        "id": 16,
        "text": "C#",
        "order": 3,
        "pollId": 4
      }
    ]
  }
}
```

---

### GET /api/polls/:id - Obter detalhes de uma enquete

**Requisição:**

```bash
curl -X GET http://localhost:5000/api/polls/1
```

**Resposta (200 OK):**

```json
{
  "id": 1,
  "title": "📚 Qual é o melhor framework web?",
  "description": null,
  "startDate": "2026-01-04T19:03:15.000Z",
  "endDate": "2026-01-17T19:03:15.000Z",
  "options": [
    {
      "id": 1,
      "text": "React",
      "order": 0,
      "pollId": 1,
      "votes": [
        {
          "id": 1,
          "optionId": 1,
          "pollId": null
        },
        {
          "id": 2,
          "optionId": 1,
          "pollId": null
        }
      ]
    },
    {
      "id": 2,
      "text": "Vue.js",
      "order": 1,
      "pollId": 1,
      "votes": [
        {
          "id": 3,
          "optionId": 2,
          "pollId": null
        }
      ]
    },
    {
      "id": 3,
      "text": "Angular",
      "order": 2,
      "pollId": 1,
      "votes": [
        {
          "id": 4,
          "optionId": 3,
          "pollId": null
        }
      ]
    },
    {
      "id": 4,
      "text": "Svelte",
      "order": 3,
      "pollId": 1,
      "votes": []
    }
  ]
}
```

---

### DELETE /api/polls/:id - Deletar uma enquete

**Requisição:**

```bash
curl -X DELETE http://localhost:5000/api/polls/4
```

**Resposta (200 OK):**

```json
{
  "message": "Enquete deletada com sucesso"
}
```

---

### POST /api/polls/:id/vote - Votar em uma opção

**Requisição:**

```bash
curl -X POST http://localhost:5000/api/polls/3/vote \
  -H "Content-Type: application/json" \
  -d '{
    "optionId": 9
  }'
```

**Resposta (201 Created):**

```json
{
  "message": "Voto registrado com sucesso",
  "vote": {
    "id": 5,
    "optionId": 9,
    "pollId": "3"
  }
}
```

---

### GET /api/polls/:id/results - Obter resultados da enquete

**Requisição:**

```bash
curl -X GET http://localhost:5000/api/polls/1/results
```

**Resposta (200 OK):**

```json
{
  "pollId": 1,
  "title": "🎨 Qual é sua linguagem de programação favorita?",
  "results": [
    {
      "id": 1,
      "text": "JavaScript / TypeScript",
      "votes": 3
    },
    {
      "id": 2,
      "text": "Python",
      "votes": 2
    },
    {
      "id": 3,
      "text": "Java",
      "votes": 0
    },
    {
      "id": 4,
      "text": "C / C++",
      "votes": 5
    }
  ]
}
```

---

## ✅ Validações Obrigatórias

### POST /api/polls - Criar Enquete

| Campo         | Tipo     | Obrigatório | Regras                             |
| ------------- | -------- | ----------- | ---------------------------------- |
| `title`       | String   | ✅ Sim      | Não pode estar vazio               |
| `description` | String   | ❌ Não      | Pode estar vazio                   |
| `startDate`   | ISO 8601 | ✅ Sim      | Deve ser válido                    |
| `endDate`     | ISO 8601 | ✅ Sim      | Deve ser posterior a `startDate`   |
| `options`     | Array    | ✅ Sim      | Mínimo 3 opções, cada uma é string |

**Erros Possíveis:**

```json
{
  "message": "Título, datas e mínimo 3 opções são obrigatórios"
}
```

```json
{
  "message": "Data de início deve ser anterior à de término"
}
```

### PUT /api/polls/:id - Atualizar Enquete

| Campo         | Tipo     | Obrigatório | Regras                                         | Observação                |
| ------------- | -------- | ----------- | ---------------------------------------------- | ------------------------- |
| `title`       | String   | ❌ Não      | Se informado, não pode estar vazio             | Pode ser omitido          |
| `description` | String   | ❌ Não      | Pode estar vazio                               |
| `startDate`   | ISO 8601 | ❌ Não      | Se informado, deve ser válido                  | Pode ser omitido          |
| `endDate`     | ISO 8601 | ❌ Não      | Se informado, deve ser posterior a `startDate` | Pode ser omitido          |
| `options`     | Array    | ❌ Não      | Se informado, mínimo 3 opções válidas          | Votos preservados pelo ID |

**Erros Possíveis:**

```json
{
  "message": "Mínimo de 3 opções válidas e preenchidas é obrigatório"
}
```

```json
{
  "message": "Data de início deve ser anterior à de término"
}
```

### POST /api/polls/:id/vote - Votar

| Campo      | Tipo    | Obrigatório | Regras                             |
| ---------- | ------- | ----------- | ---------------------------------- |
| `optionId` | Integer | ✅ Sim      | Deve existir e pertencer à enquete |

**Erros Possíveis:**

```json
{
  "message": "OptionId é obrigatório"
}
```

```json
{
  "message": "Enquete não está ativa"
}
```

```json
{
  "message": "Opção não encontrada ou não pertence a esta enquete"
}
```

---

## 🔴 Códigos de Resposta HTTP

| Código | Significado  | Quando Ocorre                                      |
| ------ | ------------ | -------------------------------------------------- |
| 200    | OK           | GET, PUT e DELETE bem-sucedidos                    |
| 201    | Created      | POST bem-sucedido (recurso criado)                 |
| 400    | Bad Request  | Validação falhou (campos inválidos, datas erradas) |
| 404    | Not Found    | Enquete ou opção não existe                        |
| 500    | Server Error | Erro interno do servidor                           |

---

## 🗄️ Modelo de Dados

### Poll (Enquete)

```javascript
{
  id: Integer (Primary Key),
  title: String,
  description: String,
  startDate: DateTime,
  endDate: DateTime
}
```

### Option (Opção)

```javascript
{
  id: Integer (Primary Key),
  text: String,
  order: Integer NOT NULL,
  pollId: Integer (Foreign Key)
}
```

### Vote (Voto)

```javascript
{
  id: Integer (Primary Key),
  pollId: Integer (FOreign Key),
  optionId: Integer (Foreign Key)
}
```

---

## 📊 Scripts de Banco de Dados

### Inicializar

```bash
npm run init:db
```

Cria o banco de dados e as tabelas necessárias.

### Resetar

```bash
npm run reset:db
```

⚠️ Deleta TODOS os dados e recria as tabelas vazias.

### Popular

```bash
npm run seed:db
```

Popula com 3 enquetes de exemplo (uma em andamento, uma não iniciada, uma finalizada com votos).

### Configurar Tudo

```bash
npm run setup:db
```

Executa init + seed automaticamente (recomendado para primeira vez).

---

## 🎨 Paleta de Cores

```
--primary:        #6366f1    (Indigo)
--primary-light:  #818cf8    (Indigo Light)
--primary-dark:   #4f46e5    (Indigo Dark)
--secondary:      #ec4899    (Pink)
--success:        #10b981    (Green)
--warning:        #f59e0b    (Amber)
--danger:         #ef4444    (Red)
--bg:             #f8fafc    (Slate Light)
--surface:        #ffffff    (White)
--text-primary:   #1e293b    (Slate Dark)
--text-secondary: #64748b    (Slate)
--border:         #e2e8f0    (Slate Light)
```

---

## 📱 Responsividade

| Breakpoint | Resolução      | Dispositivos       |
| ---------- | -------------- | ------------------ |
| Desktop    | > 1200px       | Monitores, Laptops |
| Tablet     | 768px - 1200px | iPads, Tablets     |
| Mobile     | < 768px        | Smartphones        |

---

## ✏️ Edição de Enquetes - Preservação de Dados

### Como Funciona a Edição

Quando você **edita uma enquete**, o sistema preserva inteligentemente:

- ✅ **Votos das opções** - Mantém os votos associados ao texto da opção
- ✅ **Ordem das opções** - Preserva a ordem que você define (salva no banco com campo `order`)
- ✅ **Datas** - Pode alterar datas sem perder votos
- ✅ **Título** - Pode renomear a enquete sem afetar votos
- ✅ **Opções** - Pode renomear as opções sem afetar votos

### Exemplos Práticos

#### Cenário 1: Reordenar Opções

```
ANTES:                          DEPOIS (após editar):
1. Python (3 votos)       →     1. Java (2 votos)
2. Java (2 votos)         →     2. Python (3 votos)
3. JavaScript (5 votos)   →     3. JavaScript (5 votos)
```

✅ **Resultado:** Os votos seguem o ID da opção, não a posição!

#### Cenário 2: Alterar Data

```
ANTES:                              DEPOIS (após editar):
Título: Favoritas (5 votos total)   Título: Favoritas (5 votos total)
Data: 17/01 - 24/01                 Data: 17/01 - 31/01
Python: 3 votos              →      Python: 3 votos
Java: 2 votos                       Java: 2 votos
```

✅ **Resultado:** Votos intactos, apenas data alterada!

#### Cenário 3: Renomear Opção

```
ANTES:                      DEPOIS (após editar):
Python: 3 votos      →      Python 3.12: 3 votos
```

✅ **Resultado:** A opção antiga não é deletada.

### Como o Backend Preserva os Dados

```javascript
// Ao editar uma enquete (PUT /api/polls/:id)
// 1. Identifica opções pelo ID
// 2. Para cada opção:
//    ├─ Se o ID existe no banco → atualiza (votos preservados)
//    ├─ Se é novo → cria (0 votos)
//    └─ Se foi removido → deleta (votos também são deletados)
// 3. Atualiza o campo 'order' para preservar a ordem
```

### Campo `order` no Banco de Dados

```
TABLE: options
├─ id: Integer (Primary Key)
├─ text: String (identifica a opção)
├─ order: Integer (preserva a ordem)
└─ pollId: Integer (Foreign Key)
```

O campo `order` garante que as opções sempre apareçam na ordem que você definiu, independentemente de quantas edições você fizer.

---

## 🔄 Fluxo de Votação em Tempo Real

1. **Usuário vota** na opção
2. **Frontend envia** POST para `/api/polls/:id/vote`
3. **Backend cria** registro de Vote
4. **Socket.io emite** evento `updateVotes`
5. **Todos clientes** recebem atualização
6. **Interface atualiza** badges de contagem instantaneamente

---

## 🧪 Dados de Teste

Quando você executa `npm run seed:db`, são criadas:

### Enquete 1: Em Andamento

**Qual é sua linguagem de programação favorita?**

- JavaScript / TypeScript
- Python
- Java
- C / C++

### Enquete 2: Não Iniciada

**Qual sistema operacional você usa?**

- Windows
- macOS
- Linux
- Outro

### Enquete 3: Finalizada

**Qual é o melhor framework web?**

- React (2 votos)
- Vue.js (1 votos)
- Angular (1 votos)
- Svelte (0 votos)

---

## 🐛 Troubleshooting

### "Cannot connect to MySQL"

1. Verifique se MySQL está rodando
2. Confirme credenciais em `.env`
3. Execute `npm run init:db` novamente

### "Port already in use"

Mude a porta em `.env` ou mate o processo:

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Dados não aparecem

1. Verifique se backend está rodando
2. Abra F12 no navegador e veja console
3. Execute `npm run seed:db` para popular

---

## 📚 Documentação Adicional

- [SETUP.md](./SETUP.md) - Instruções completas de configuração
- [backend/scripts/README.md](./backend/scripts/README.md) - Documentação dos scripts de BD
- [backend/config/database.js](./backend/config/database.js) - Configuração do banco
