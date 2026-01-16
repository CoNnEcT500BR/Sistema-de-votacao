# ✅ Sistema de Gerenciamento de Banco de Dados

## 🚀 Como Usar

### Primeira Vez (Recomendado)

```bash
cd backend
npm run setup:db    # Faz TUDO automaticamente
npm start           # Inicia servidor
```

### Limpar e Recomeçar

```bash
npm run reset:db    # Deleta dados
npm run seed:db     # Adiciona novos dados
npm start
```

### Só Inicializar (Vazio)

```bash
npm run init:db     # Cria estrutura vazia
npm start           # Servidor sem dados
```

---

## 📊 Dados de Teste Criados

Quando você executa `npm run seed:db`, são criadas **3 enquetes**:

### 1️⃣ Em Andamento

**"Qual é sua linguagem de programação favorita?"**

- JavaScript / TypeScript
- Python
- Java
- C / C++

### 2️⃣ Não Iniciada

**"Qual sistema operacional você usa?"**

- Windows
- macOS
- Linux
- Outro

### 3️⃣ Finalizada

**"Qual é o melhor framework web?"** (com votos)

- React: 10 votos
- Vue.js: 7 votos
- Angular: 5 votos
- Svelte: 3 votos

---

## 💡 Casos de Uso

### Para Desenvolvedores

```bash
# Trabalhar com dados de teste
npm run setup:db

# Resetar quando algo der errado
npm run reset:db
npm run seed:db
```

### Para Testes Automatizados

```bash
# Cada teste começa limpo
npm run reset:db
npm run seed:db
npm test
```

### Para Demonstração

```bash
# Mostrar funcionalidade
npm run setup:db
npm start
# → Abre com dados prontos para usar
```

## 📋 Scripts npm Disponíveis

```json
{
  "start": "node app.js",
  "dev": "nodemon app.js",
  "init:db": "node scripts/init-db.js",
  "reset:db": "node scripts/reset-db.js",
  "seed:db": "node scripts/seed-db.js",
  "setup:db": "npm run init:db && npm run seed:db"
}
```

**Usar assim:**

```bash
npm run init:db    # Inicializa
npm run reset:db   # Reseta
npm run seed:db    # Popula
npm run setup:db   # Tudo junto
npm start          # Servidor
npm run dev        # Com auto-reload
```

---

## 🎯 Fluxo Recomendado

```
┌─────────────────┐
│   Primeiro uso  │
├─────────────────┤
│ npm install     │
│ npm run setup:db│
│ npm start       │
│ Abre navegador  │
└─────────────────┘
        ↓
    ✅ Funcionando!
        ↓
┌─────────────────┐
│ Desenvolvimento │
├─────────────────┤
│ npm run dev     │
│ (auto-reload)   │
│ Criar enquetes  │
│ Testar votação  │
└─────────────────┘
        ↓
    Se precisar resetar:
        ↓
┌─────────────────┐
│ Reset & Recomeço│
├─────────────────┤
│ npm run reset:db│
│ npm run seed:db │
│ npm run dev     │
└─────────────────┘
```

---

## 📖 Documentação

Para mais detalhes, consulte:

- **`SETUP.md`** - Guia completo de configuração
- **`README.md`** - Documentação do projeto
- **`backend/scripts/README.md`** - Documentação dos scripts e Guia

---

## 🎓 Exemplo de Uso Completo

```bash
# 1. Instalar dependências
npm install

# 2. Primeiro setup (recomendado)
npm run setup:db
# → Cria banco + tabelas + dados de teste

# 3. Iniciar servidor
npm start
# → Pronto para usar!

# 4. Em outro terminal, abrir frontend
cd ../frontend
npm run dev

# 5. Abrir http://localhost:5173
# → Aplicação funcionando com dados!

# Se precisar resetar depois:
npm run reset:db    # Deleta tudo
npm run seed:db     # Adiciona novos dados
# → Recomeça do zero!
```

---

## 🆘 Troubleshooting Rápido

| Problema            | Solução                                  |
| ------------------- | ---------------------------------------- |
| MySQL não conecta   | Verificar `.env` e se MySQL está rodando |
| Banco já existe     | Normal! Script verifica e continua       |
| Perdeu dados        | `npm run reset:db` + `npm run seed:db`   |
| Script não encontra | Verificar se está na pasta `backend`     |
