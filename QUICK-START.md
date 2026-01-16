# 🎉 Sistema de Votação

## 🚀 Quick Start (5 minutos)

```bash
# 1. Vá para o backend
cd backend

# 2. Instale dependências (se não fez ainda)
npm install

# 3. Configure .env (crie o arquivo com suas credenciais MySQL e Porta do Backend)
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha_aqui
DB_NAME=voting_system
DB_PORT=3306

PORT=5000

# 4. Setup automático (recomendado!)
npm run setup:db

# 5. Inicie o servidor
npm start

# 6. Em outro terminal, vá para frontend
cd frontend
npm install
npm run dev

# 7. Abra http://localhost:5173
```

**Pronto! Sistema rodando com dados! 🎉**

---

## 📋 Referência Rápida

| Comando            | O que faz                  |
| ------------------ | -------------------------- |
| `npm run setup:db` | Init + Seed (RECOMENDADO)  |
| `npm run init:db`  | Só cria estrutura vazia    |
| `npm run seed:db`  | Só adiciona dados de teste |
| `npm run reset:db` | Deleta TUDO e recria vazio |
| `npm start`        | Inicia servidor            |
| `npm run dev`      | Servidor com auto-reload   |

---

## 🎯 Dados de Teste

### Enquete 1: Em Andamento ✅

"Qual é sua linguagem de programação favorita?"

- JavaScript / TypeScript
- Python
- Java
- C / C++

### Enquete 2: Não Iniciada ⏳

"Qual sistema operacional você usa?"

- Windows
- macOS
- Linux
- Outro

### Enquete 3: Finalizada ✓

"Qual é o melhor framework web?" (com votos)

- React: 10 votos
- Vue.js: 7 votos
- Angular: 5 votos
- Svelte: 3 votos

---

## 🔄 Fluxo de Uso

```
Primeira Vez:
  npm install → npm run setup:db → npm start → ✅ Funcionando!

Desenvolvimento:
  npm run dev → criar enquetes → testar votação → ✅ Tudo ok!

Se der problema:
  npm run reset:db → npm run seed:db → npm run dev → ✅ Recomeçado!
```

---

## 📖 Mais Informações

- **SETUP.md** - Guia completo de configuração passo-a-passo
- **README.md** - Documentação completa do projeto
- **backend/scripts/README.md** - Documentação detalhada dos scripts e Guia

---

## 🆘 Problemas Comuns

### "Cannot connect to database"

→ Verificar `.env` e se MySQL está rodando

### "Database already exists"

→ Normal! Script continua mesmo que exista

### "Port already in use"

→ Mudar PORT em `.env` ou matar processo anterior

### "Script not found"

→ Verificar se está na pasta `backend`

---

## 📚 Documentação Relacionada

- **[README.md](./README.md)** - Documentação completa com exemplos de API
- **[SETUP.md](./SETUP.md)** - Instruções passo-a-passo
- **[Exemplos de Requisições](./README.md#-exemplos-de-requisições)** - Como usar GET, POST, DELETE
- **[Códigos HTTP](./README.md#-códigos-de-resposta-http)** - Status de resposta

---

## 🚀 Próximos Passos

1. **Ler SETUP.md** - Para instrições detalhadas
2. **Executar `npm run setup:db`** - Para configurar tudo
3. **Iniciar `npm start`** - Para rodar servidor
4. **Iniciar `npm run dev` (frontend)** - Para interface
5. **Abrir navegador** - http://localhost:5173
6. **Explorar a aplicação** - Testar criar, votar, editar
7. **Testar API** - Ver [Exemplos de Requisições](./README.md#-exemplos-de-requisições)
