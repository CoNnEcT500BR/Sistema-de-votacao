# 🚀 Guia de Configuração - Sistema de Votação

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 18+ ([download](https://nodejs.org))
- **npm** ou **yarn** (vem com Node.js)
- **MySQL** 5.7+ ([download](https://www.mysql.com/downloads/))
- **Git** (opcional, mas recomendado)

### Verificar Instalação:

```bash
node --version      # v18.0.0 ou superior
npm --version       # 9.0.0 ou superior
mysql --version     # 5.7.0 ou superior
```

---

## 🔧 Configuração Inicial

### 1. Clonar ou Extrair o Projeto

```bash
# Se estiver versionado no Git
git clone <seu-repositorio>
cd sistema-votacao

# Ou extrair o ZIP
unzip sistema-votacao.zip
cd sistema-votacao
```

### 2. Instalar Dependências

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

## 🗄️ Configurar Banco de Dados

### 1. Criar arquivo `.env` no Backend

```bash
# Na pasta backend/
touch .env
# Ou no Windows:
type nul > .env
```

Adicione o seguinte conteúdo (adapte as credenciais):

```env
# Configurações do MySQL
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha_aqui
DB_NAME=voting_system
DB_PORT=3306

# Servidor
PORT=5000
```

**⚠️ Importante:**

- Substitua `sua_senha_aqui` pela senha do seu MySQL
- Se não configurou senha, deixe em branco: `DB_PASS=`
- Se MySQL está em outra máquina, altere `DB_HOST`
- Se achar necessário altere o `DB_PORT`

### 2. Inicializar o Banco de Dados

#### Opção A: Configuração Automática (Recomendado)

```bash
# Na pasta backend/
npm run setup:db
```

Este comando faz tudo automaticamente:

1. ✅ Cria o banco de dados `voting_system`
2. ✅ Cria as tabelas
3. ✅ Popula com dados de teste

**Pronto para usar!** Vá para [Iniciar Servidor](#-iniciar-servidor)

---

#### Opção B: Configuração Manual (Passo a Passo)

**Passo 1:** Criar banco de dados no MySQL

```bash
# Abra o prompt do MySQL
mysql -u root -p

# Dentro do MySQL, execute:
CREATE DATABASE voting_system;
USE voting_system;
EXIT;
```

**Passo 2:** Inicializar tabelas

```bash
# Na pasta backend/
npm run init:db
```

**Passo 3:** Popular com dados de teste

```bash
npm run seed:db
```

---

## 🖥️ Iniciar Servidor

### Backend

```bash
# Na pasta backend/
npm start
# ou para desenvolvimento com auto-reload:
npm run dev
```

Você deve ver:

```
Servidor rodando em http://localhost:5000
Conexão com MySQL estabelecida
Tabelas sincronizadas
```

### Frontend

Em outro terminal:

```bash
# Na pasta frontend/
touch .env
# Ou no Windows:
type nul > .env
```

Adicione o seguinte conteúdo (adapte as credenciais):

```env
VITE_API_URL=http://localhost:5000
VITE_API_SOCKET_URL=http://localhost:5000
```

```bash
# Na pasta frontend/
npm run dev
```

Você deve ver:

```
VITE v7.3.1 ready in xxx ms
Local: http://localhost:5173
```

---

## 🌐 Acessar a Aplicação

Abra seu navegador em:

```
http://localhost:5173
```

Pronto! 🎉 A aplicação está rodando!

---

## 📚 Scripts Disponíveis

### Backend

| Script           | Comando            | Descrição                     |
| ---------------- | ------------------ | ----------------------------- |
| Iniciar Servidor | `npm start`        | Inicia o servidor             |
| Desenvolvimento  | `npm run dev`      | Inicia com auto-reload        |
| Inicializar DB   | `npm run init:db`  | Cria banco e tabelas          |
| Resetar DB       | `npm run reset:db` | Deleta e recria tabelas       |
| Popular DB       | `npm run seed:db`  | Adiciona dados de teste       |
| Setup Completo   | `npm run setup:db` | Init + Seed (tudo de uma vez) |

### Frontend

| Script          | Comando           | Descrição                          |
| --------------- | ----------------- | ---------------------------------- |
| Desenvolvimento | `npm run dev`     | Inicia servidor de desenvolvimento |
| Build           | `npm run build`   | Compila para produção              |
| Preview         | `npm run preview` | Visualiza build de produção        |
| Lint            | `npm run lint`    | Verifica erros de código           |

---

## 🐛 Troubleshooting

### Erro: "Cannot find module 'sequelize'"

**Solução:**

```bash
cd backend
npm install
```

### Erro: "Connection refused at 127.0.0.1:3306"

**Problema:** MySQL não está rodando

**Solução Windows:**

```bash
# Abrir Services e iniciar MySQL
net start MySQL80  # ou o nome do seu serviço
```

**Solução macOS:**

```bash
brew services start mysql
```

**Solução Linux:**

```bash
sudo systemctl start mysql
```

### Erro: "Access denied for user 'root'@'localhost'"

**Problema:** Senha do MySQL incorreta

**Solução:**

1. Abra o arquivo `.env`
2. Atualize `DB_PASS` com a senha correta
3. Execute `npm run init:db` novamente

### Erro: "Port 5000 is already in use"

**Solução:** Mudar porta no arquivo `.env`:

```env
PORT=5001
```

Ou matar o processo:

**Windows:**

```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**macOS/Linux:**

```bash
lsof -i :5000
kill -9 <PID>
```

### Frontend não carrega/diz "Cannot GET /"

**Problema:** Backend não está rodando

**Solução:**

1. Abra outro terminal
2. Vá para pasta `backend`
3. Execute `npm start`

### Dados não aparecem após criar enquete

**Solução:**

1. Verifique se backend está rodando
2. Abra console do navegador (F12) e veja erros
3. Verifique credenciais MySQL em `.env`

---

## 🔄 Resetar Tudo

Se algo der errado ou quiser começar do zero:

```bash
# 1. Parar os servidores (Ctrl+C em cada terminal)

# 2. Resetar banco de dados
cd backend
npm run reset:db
# Digite 'sim' quando pedido

# 3. Popular novamente
npm run seed:db

# 4. Reiniciar
npm run dev
```

---

## 📂 Estrutura de Pastas

```
sistema-votacao/
├── backend/
│   ├── scripts/           # Scripts de DB
│   │   ├── check-db.js   # Verifica
│   │   ├── init-db.js    # Inicializar
│   │   ├── reset-db.js   # Resetar
│   │   ├── seed-db.js    # Popular
│   │   ├── README.md     # Guia completo
│   │   └── README.md     # Documentação
│   ├── config/
│   │   └── database.js   # Configuração MySQL
│   ├── models/
│   │   ├── Poll.js
│   │   ├── Option.js
│   │   └── Vote.js
│   ├── app.js            # Servidor principal
│   ├── package.json
│   ├── .env              # Variáveis de ambiente
│   └── node_modules/
│
├── frontend/
│   ├── src/
│   │   ├── components/   # Componentes React
│   │   └── styles/       # CSS Modules
│   ├── public/
│   ├── env.local
│   ├── env.production
│   ├── package.json
│   └── node_modules/
│
├── README.md             # Documentação principal
├── INDEX.md              # Índice
├── QUICK-START.md        # Resumo rápido
├── SYSTEM-MAP.md         # Diagrama visual
├── DATABASE.md           # Resumo BD
├── index.html            # Índice visual
└── SETUP.md              # Este arquivo
```

---

## ✅ Verificação Final

Para confirmar que tudo está funcionando:

### Backend:

- [ ] MySQL está rodando
- [ ] Arquivo `.env` está configurado
- [ ] `npm run init:db` executa sem erros
- [ ] `npm start` mostra "Servidor rodando na porta 5000"

### Frontend:

- [ ] Arquivo `.env` está configurado
- [ ] `npm run dev` inicia sem erros
- [ ] Navegador abre `http://localhost:5173`
- [ ] Página carrega sem erros no console

### Funcionalidade:

- [ ] Consegue ver a lista de enquetes
- [ ] Consegue criar uma nova enquete
- [ ] Consegue votar em uma enquete
- [ ] Os votos aparecem em tempo real

---

## 🆘 Contato / Suporte

Se encontrar problemas:

1. **Verifique o console** (F12 no navegador)
2. **Leia os logs** do terminal onde rodou `npm start`
3. **Consulte troubleshooting** acima
4. **Verifique o README.md** para mais informações

---

## 🧪 Testes Rápidos da API

Após iniciar o servidor, você pode testar os endpoints:

### Testar GET /api/polls

```bash
curl -X GET http://localhost:5000/api/polls
```

Ou no navegador: `http://localhost:5000/api/polls`

### Testar POST /api/polls

```bash
curl -X POST http://localhost:5000/api/polls \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Poll",
    "startDate": "2026-01-17T10:00:00Z",
    "endDate": "2026-01-24T10:00:00Z",
    "options": ["Option 1", "Option 2", "Option 3"]
  }'
```

### Obter ID de uma Enquete

```bash
curl -X GET http://localhost:5000/api/polls | jq '.[0].id'
```

### Testar GET /api/polls/:id (substituir 1 pelo ID real)

```bash
curl -X GET http://localhost:5000/api/polls/1
```

### Testar DELETE /api/polls/:id (substituir 1 pelo ID real)

```bash
curl -X DELETE http://localhost:5000/api/polls/1
```

**Nota:** Para exemplos mais completos, veja [README.md - Exemplos de Requisições](./README.md#-exemplos-de-requisições)
