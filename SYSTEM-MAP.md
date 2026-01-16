# 📊 Mapa Visual do Sistema de Gerenciamento de Banco de Dados

## 🔄 Fluxo de Execução

### Ao rodar `npm run setup:db`

```
┌─────────────────────────────────┐
│  npm run setup:db               │
├─────────────────────────────────┤
│ Executa: init:db + seed:db      │
└──────────────┬──────────────────┘
               ↓
    ┌──────────────────────┐
    │   npm run init:db    │
    │   ├─ Conecta MySQL   │
    │   ├─ Cria banco      │
    │   ├─ Cria tabelas    │
    │   └─ Define relações │
    └──────────┬───────────┘
               ↓
    ┌──────────────────────┐
    │   npm run seed:db    │
    │   ├─ Conecta banco   │
    │   ├─ Limpa dados     │
    │   ├─ Cria enquetes   │
    │   └─ Adiciona votos  │
    └──────────┬───────────┘
               ↓
        ✅ Banco pronto!
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
│  ├─ title (String)
│  ├─ description (String)
│  ├─ startDate (DateTime)
│  ├─ endDate (DateTime)
│  ├─ createdAt (DateTime)
│  └─ updatedAt (DateTime)
│
├─ TABLE: options
│  ├─ id (Integer, Primary Key)
│  ├─ text (String)
│  ├─ pollId (Integer, Foreign Key)
│  ├─ createdAt (DateTime)
│  └─ updatedAt (DateTime)
│
└─ TABLE: votes
   ├─ id (Integer, Primary Key)
   ├─ optionId (Integer, Foreign Key)
   ├─ createdAt (DateTime)
   └─ updatedAt (DateTime)
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
Status: Votação ativa
```

Enquete 2: **Não Iniciada** ⏳

```
Título: Qual SO você usa?
Opções:
  - Windows
  - macOS
  - Linux
  - Outro
Status: Não pode votar ainda
```

Enquete 3: **Finalizada** ✓

```
Título: Melhor framework web?
Opções com votos:
  - React: 10 votos ✓
  - Vue.js: 7 votos ✓
  - Angular: 5 votos ✓
  - Svelte: 3 votos ✓
Status: Mostra resultados apenas
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
   └─ Definir credenciais MySQL

3. INICIALIZAR BANCO
   ├─ cd backend
   └─ npm run setup:db

4. INICIAR SERVIDORES
   ├─ npm start (backend, terminal 1)
   ├─ npm run dev (frontend, terminal 2)
   └─ Abrir http://localhost:5173

5. USAR APLICAÇÃO
   ├─ Ver enquetes
   ├─ Criar nova enquete
   ├─ Votar
   ├─ Ver resultados
   └─ Editar/Deletar

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
```

---

## 📚 Documentação por Tipo

```
RÁPIDO (5 minutos)
├─ QUICK-START.md
├─ DATABASE-SETUP.md
└─ Este arquivo (QUICK-START.md)

DETALHADO (30 minutos)
├─ SETUP.md
├─ README.md
└─ backend/scripts/README.md

AVANÇADO (1 hora+)
├─ backend/scripts/README.md
├─ Código dos scripts
└─ Documentação do projeto

SEMPRE CONSULTAR
└─ Este arquivo para referência rápida!
```

---

## ✅ Checklist de Setup

- [ ] MySQL instalado e rodando
- [ ] Node.js 18+ instalado
- [ ] npm install executado (backend)
- [ ] npm install executado (frontend)
- [ ] .env configurado com credenciais
- [ ] npm run setup:db executado com sucesso
- [ ] npm start rodando (backend)
- [ ] npm run dev rodando (frontend)
- [ ] Navegador abrindo http://localhost:5173
- [ ] Consegue criar enquete
- [ ] Consegue votar
- [ ] Resultados aparecem em tempo real

✅ **Se todos os itens estão OK, está funcionando!**

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
- [backend/scripts/README.md](./backend/scripts/README.md) - Guia completo de scripts

---

## 🎉 Próximo Passo

```bash
cd backend
npm run setup:db    # Rodar isto AGORA!
npm start           # Depois isto!
```

**E pronto! Você tem um sistema de votação funcionando! 🚀**
