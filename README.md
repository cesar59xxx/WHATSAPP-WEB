# 🚀 SaaS CRM + Chatbot Omnichannel para WhatsApp

Sistema completo de **CRM e Chatbot** para gerenciar atendimento via WhatsApp, construído com **whatsapp-web.js** (sem APIs oficiais do Meta).

---

## ✨ Funcionalidades Principais

### 📱 WhatsApp Engine
- ✅ Múltiplas sessões simultâneas (multi-tenant)
- ✅ Autenticação via QR Code
- ✅ Reconexão automática
- ✅ Detecção de desconexão
- ✅ Envio/recebimento de texto, imagens, áudios e documentos
- ✅ Persistência de sessões no disco
- ✅ Load balancing de sessões

### 💬 Inbox (Chat em Tempo Real)
- ✅ Interface estilo Zendesk/Intercom
- ✅ WebSocket para mensagens instantâneas
- ✅ Histórico completo de conversas
- ✅ Upload de mídia
- ✅ Informações do contato
- ✅ Status de leitura e envio

### 🎯 CRM Completo
- ✅ Cadastro de contatos automático
- ✅ Tags personalizáveis
- ✅ Pipeline Kanban com etapas
- ✅ Observações e histórico
- ✅ Última interação
- ✅ Importação/exportação CSV
- ✅ Filtros e busca avançada

### 🤖 Sistema de Chatbot
- ✅ Criador visual de fluxos (drag-and-drop)
- ✅ Gatilhos por palavra-chave
- ✅ Condições (if/else)
- ✅ Respostas automáticas
- ✅ Variáveis dinâmicas (nome, email, etc)
- ✅ Agendamento de mensagens
- ✅ API interna para integração

### 👥 Multi-tenant (SaaS)
- ✅ Contas isoladas por cliente
- ✅ Planos (Free, Pro, Enterprise)
- ✅ Limites por plano
- ✅ Painel administrativo master
- ✅ Gestão de usuários e permissões
- ✅ Sistema de billing simulado

### 🔐 Segurança
- ✅ Autenticação JWT
- ✅ Refresh tokens
- ✅ Rate limiting
- ✅ Helmet.js (proteção HTTP)
- ✅ CORS configurável
- ✅ Senhas criptografadas (bcrypt)

---

## 🏗️ Arquitetura

### Stack Tecnológica

**Backend:**
- Node.js 18+ com Express 5
- MongoDB (banco de dados)
- Redis (cache e filas)
- Socket.IO (WebSocket)
- Bull (filas de processamento)
- whatsapp-web.js 1.34.2

**Frontend:**
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Shadcn/ui
- Zustand (state)
- React Flow (editor visual)

**Infraestrutura:**
- Docker (containerização)
- Puppeteer (automação browser)

### Estrutura de Pastas

\`\`\`
saas-crm-whatsapp/
├── server/                    # Backend Express
│   ├── config/               # Configurações (DB, Redis)
│   ├── controllers/          # Controladores da API
│   ├── middleware/           # Auth, error handling
│   ├── models/              # Schemas MongoDB
│   ├── queues/              # Filas Bull/Redis
│   ├── routes/              # Rotas da API
│   ├── services/            # Lógica de negócio
│   ├── socket/              # Handlers WebSocket
│   ├── workers/             # Processadores de fila
│   └── index.js             # Entry point backend
├── app/                      # Frontend Next.js
│   ├── (auth)/              # Páginas de autenticação
│   ├── (dashboard)/         # Páginas do dashboard
│   ├── (admin)/             # Painel administrativo
│   ├── layout.tsx           # Layout raiz
│   └── page.tsx             # Landing page
├── components/              # Componentes React
│   ├── providers/          # Context providers
│   └── ui/                 # Componentes shadcn/ui
├── lib/                    # Utilitários e helpers
│   ├── api-client.ts       # Cliente HTTP
│   └── stores/             # Zustand stores
├── scripts/                # Scripts auxiliares
├── public/                 # Arquivos estáticos
└── .wwebjs_auth/          # Sessões WhatsApp (auto-criado)
\`\`\`

---

## 🚀 Instalação e Uso

### ⚡ Início Rápido (5 minutos)

Siga o **[INICIO_RAPIDO.md](./INICIO_RAPIDO.md)** para rodar o sistema rapidamente.

### 📋 Instalação Completa

#### 1. Pré-requisitos

\`\`\`bash
# Node.js 18+
node --version

# MongoDB (local ou Atlas)
mongod --version

# Redis (local ou Docker)
redis-cli --version
\`\`\`

#### 2. Clone e Instale

\`\`\`bash
# Clone o repositório
git clone <seu-repo>
cd saas-crm-whatsapp

# Instale dependências
npm install

# Configure o ambiente
npm run setup
\`\`\`

#### 3. Configure .env

\`\`\`env
# Banco de Dados
MONGODB_URI=mongodb://localhost:27017/whatsapp-crm-saas

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT
JWT_SECRET=sua-chave-secreta-aqui
JWT_REFRESH_SECRET=sua-chave-refresh-aqui
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d

# URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:3001
PORT=3001

# Outros
NODE_ENV=development
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
\`\`\`

#### 4. Inicie os Serviços

\`\`\`bash
# Opção 1: Tudo junto (recomendado para dev)
npm run dev

# Opção 2: Separado
npm run dev:backend    # Terminal 1 - Backend (porta 3001)
npm run dev:frontend   # Terminal 2 - Frontend (porta 3000)
npm run dev:worker     # Terminal 3 - Worker de filas (opcional)
\`\`\`

#### 5. Acesse o Sistema

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:3001/api/health
- **Admin:** http://localhost:3000/admin

---

## 📖 Documentação Completa

- [**INICIO_RAPIDO.md**](./INICIO_RAPIDO.md) - Comece aqui!
- [**ARCHITECTURE.md**](./ARCHITECTURE.md) - Arquitetura técnica detalhada
- [**GUIA_DE_USO.md**](./GUIA_DE_USO.md) - Como usar cada funcionalidade
- [**TROUBLESHOOTING.md**](./TROUBLESHOOTING.md) - Solução de problemas

---

## 🔌 API REST

### Endpoints Principais

**Autenticação:**
\`\`\`
POST   /api/auth/register          # Registrar tenant
POST   /api/auth/login             # Login
POST   /api/auth/refresh           # Renovar token
GET    /api/auth/me                # Dados do usuário
\`\`\`

**WhatsApp:**
\`\`\`
POST   /api/whatsapp/initialize    # Criar sessão
GET    /api/whatsapp/qr/:sessionId # Obter QR Code
GET    /api/whatsapp/status/:sessionId # Status da sessão
POST   /api/whatsapp/send          # Enviar mensagem
DELETE /api/whatsapp/:sessionId    # Desconectar
\`\`\`

**Contatos (CRM):**
\`\`\`
GET    /api/contacts               # Listar contatos
POST   /api/contacts               # Criar contato
GET    /api/contacts/:id           # Detalhes
PUT    /api/contacts/:id           # Atualizar
DELETE /api/contacts/:id           # Deletar
\`\`\`

**Mensagens:**
\`\`\`
GET    /api/messages               # Listar mensagens
GET    /api/messages/contact/:contactId # Por contato
POST   /api/messages               # Enviar (via API)
\`\`\`

**Chatbots:**
\`\`\`
GET    /api/chatbots               # Listar fluxos
POST   /api/chatbots               # Criar fluxo
PUT    /api/chatbots/:id           # Atualizar
DELETE /api/chatbots/:id           # Deletar
POST   /api/chatbots/:id/activate  # Ativar/desativar
\`\`\`

**Admin:**
\`\`\`
GET    /api/admin/tenants          # Listar tenants
GET    /api/admin/sessions         # Sessões ativas
GET    /api/admin/stats            # Estatísticas
\`\`\`

---

## 🔄 WebSocket Events

### Cliente → Servidor
\`\`\`javascript
// Autenticar
socket.emit('authenticate', { token: 'jwt-token' })

// Enviar mensagem
socket.emit('send-message', {
  sessionId: 'session-id',
  to: '5511999999999@c.us',
  message: 'Olá!'
})
\`\`\`

### Servidor → Cliente
\`\`\`javascript
// Mensagem recebida
socket.on('new-message', (data) => {
  console.log('Nova mensagem:', data)
})

// QR Code atualizado
socket.on('qr-updated', (data) => {
  console.log('QR Code:', data.qr)
})

// Sessão conectada
socket.on('session-ready', (data) => {
  console.log('Sessão pronta:', data.sessionId)
})

// Sessão desconectada
socket.on('session-disconnected', (data) => {
  console.log('Desconectada:', data.sessionId)
})
\`\`\`

---

## 🐳 Deploy com Docker

### Desenvolvimento
\`\`\`bash
docker-compose up -d
\`\`\`

### Produção
\`\`\`dockerfile
# Build
docker build -t whatsapp-crm-saas .

# Run
docker run -d \
  -p 3000:3000 \
  -p 3001:3001 \
  -e MONGODB_URI=mongodb://mongo:27017/whatsapp-crm \
  -e REDIS_HOST=redis \
  whatsapp-crm-saas
\`\`\`

---

## 🧪 Testes

\`\`\`bash
# Testar conexão MongoDB
curl http://localhost:3001/api/health

# Testar Redis
redis-cli ping

# Testar autenticação
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "Teste SA",
    "name": "João",
    "email": "joao@teste.com",
    "password": "123456",
    "plan": "free"
  }'
\`\`\`

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Add: nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto é open-source e está sob a licença MIT.

---

## 🆘 Suporte

- Issues: [GitHub Issues](#)
- Documentação: [Arquivos .md neste repo]
- WhatsApp Web.js: https://wwebjs.dev/

---

## 🙏 Agradecimentos

- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) - Biblioteca incrível
- [shadcn/ui](https://ui.shadcn.com/) - Componentes lindos
- [Next.js](https://nextjs.org/) - Framework React perfeito
- Comunidade open-source

---

**Desenvolvido com cuidado para facilitar o atendimento via WhatsApp**
