# 🚀 Início Rápido - SaaS CRM WhatsApp

Este guia vai te ajudar a rodar o sistema em **5 minutos**.

---

## 📋 Pré-requisitos

Você precisa ter instalado:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **MongoDB** ([Download](https://www.mongodb.com/try/download/community) ou use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Redis** ([Download](https://redis.io/download) ou use Docker: `docker run -d -p 6379:6379 redis`)

---

## ⚡ Instalação em 4 Passos

### 1️⃣ Clone e Instale

\`\`\`bash
# Clone o repositório (ou descompacte o ZIP)
cd saas-crm-whatsapp

# Instale as dependências
npm install

# Configure o projeto
npm run setup
\`\`\`

### 2️⃣ Configure o Ambiente

Edite o arquivo `.env` com suas configurações:

\`\`\`env
# Banco de Dados
MONGODB_URI=mongodb://localhost:27017/whatsapp-crm-saas

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT Secrets (mude para strings aleatórias em produção)
JWT_SECRET=sua-chave-secreta-super-segura-123
JWT_REFRESH_SECRET=sua-chave-refresh-super-segura-456

# URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:3001

# Node Environment
NODE_ENV=development
\`\`\`

### 3️⃣ Inicie MongoDB e Redis

**Opção A - MongoDB e Redis locais:**
\`\`\`bash
# MongoDB (em um terminal)
mongod

# Redis (em outro terminal)
redis-server
\`\`\`

**Opção B - Usando Docker:**
\`\`\`bash
docker run -d -p 27017:27017 --name mongodb mongo
docker run -d -p 6379:6379 --name redis redis
\`\`\`

### 4️⃣ Rode o Sistema

\`\`\`bash
# Roda frontend E backend simultaneamente
npm run dev
\`\`\`

Aguarde alguns segundos e acesse:

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001/api/health

---

## 🎯 Primeiro Acesso

### 1. Registre sua Conta

1. Acesse: http://localhost:3000
2. Clique em **"Criar Conta"**
3. Preencha:
   - Nome da empresa
   - Seu nome
   - Email
   - Senha (mínimo 6 caracteres)
4. Escolha um plano (em desenvolvimento, todos funcionam)

### 2. Conecte o WhatsApp

1. Após login, vá em **"WhatsApp"** no menu lateral
2. Clique em **"Conectar Nova Sessão"**
3. Dê um nome (ex: "Atendimento")
4. Aguarde o QR Code aparecer
5. Abra o WhatsApp no celular
6. Vá em **Configurações → Aparelhos Conectados → Conectar Aparelho**
7. Escaneie o QR Code
8. Aguarde a conexão (status muda para "Conectado")

### 3. Teste o Sistema

**Envie uma mensagem de teste:**

1. No menu, clique em **"Inbox"**
2. Você verá as conversas chegando em tempo real
3. Clique em uma conversa para abrir
4. Digite uma mensagem e envie

**Crie um contato:**

1. Vá em **"Contatos"**
2. Clique em **"Novo Contato"**
3. Preencha os dados
4. Adicione tags e escolha a etapa do funil

**Configure um chatbot:**

1. Vá em **"Chatbots"**
2. Clique em **"Criar Fluxo"**
3. Dê um nome ao fluxo
4. Configure gatilhos (palavra-chave, horário, etc)
5. Adicione mensagens automáticas
6. Ative o fluxo

---

## 🐛 Problemas Comuns

### Erro: "MongoDB não conectou"

\`\`\`bash
# Verifique se o MongoDB está rodando
mongo --version
mongod

# Ou use MongoDB Atlas (cloud gratuito)
# https://www.mongodb.com/cloud/atlas
\`\`\`

### Erro: "Redis connection refused"

\`\`\`bash
# Verifique se o Redis está rodando
redis-cli ping
# Deve retornar: PONG

# Se não estiver rodando:
redis-server
\`\`\`

### Erro: "Port 3000 already in use"

\`\`\`bash
# Mate o processo na porta 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <número_do_pid> /F

# Linux/Mac:
lsof -ti:3000 | xargs kill -9
\`\`\`

### QR Code não aparece

1. Verifique se o backend está rodando (http://localhost:3001/api/health)
2. Abra o console do navegador (F12) e veja se há erros
3. Tente desconectar e reconectar a sessão
4. Limpe a pasta `.wwebjs_auth` e tente novamente

### Mensagens não chegam no Inbox

1. Verifique se o WebSocket conectou (console do navegador)
2. Certifique-se de que o Redis está rodando
3. Recarregue a página
4. Verifique se a sessão WhatsApp está "Conectada"

---

## 🎨 Recursos Extras

### Tema Escuro/Claro

Clique no ícone de sol/lua no canto superior direito do dashboard.

### Painel Administrativo

Acesse `/admin` para ver:
- Todos os tenants (clientes)
- Sessões WhatsApp ativas
- Logs do sistema
- Estatísticas globais

*Nota: Em desenvolvimento, qualquer usuário pode acessar. Em produção, adicione verificação de role.*

### Worker de Filas

Para processar mensagens em segundo plano:

\`\`\`bash
# Em um terminal separado
npm run dev:worker
\`\`\`

---

## 📚 Próximos Passos

- [Documentação Completa](./README.md)
- [Arquitetura do Sistema](./ARCHITECTURE.md)
- [Guia de Uso Detalhado](./GUIA_DE_USO.md)
- [Troubleshooting](./TROUBLESHOOTING.md)

---

## 🆘 Precisa de Ajuda?

1. Verifique o [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
2. Abra uma issue no repositório
3. Consulte a documentação do [whatsapp-web.js](https://wwebjs.dev/)

---

**🎉 Pronto! Agora você tem um SaaS CRM + Chatbot completo rodando!**
