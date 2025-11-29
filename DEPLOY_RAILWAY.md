# 🚂 Deploy no Railway - Backend WhatsApp

Este guia explica como fazer deploy do **backend Express + WhatsApp Web.js** no Railway.

> **IMPORTANTE:** O Railway será usado APENAS para o backend. O frontend Next.js deve ser deployado na Vercel.

## 📋 Pré-requisitos

1. Conta no [Railway](https://railway.app)
2. MongoDB Atlas ou Railway PostgreSQL/MongoDB
3. Upstash Redis ou Railway Redis

## 🚀 Passos para Deploy

### 1. Preparar o Repositório

Crie um repositório separado apenas com a pasta `server/`:

\`\`\`bash
# Clone seu repo
git clone https://github.com/seu-usuario/whatsapp-web.git
cd whatsapp-web

# Crie um novo repo apenas com o backend
mkdir ../whatsapp-backend
cp -r server/* ../whatsapp-backend/
cp Dockerfile.backend ../whatsapp-backend/Dockerfile

cd ../whatsapp-backend
git init
git add .
git commit -m "Initial backend commit"
\`\`\`

### 2. Deploy no Railway

1. Acesse [railway.app](https://railway.app)
2. Clique em **"New Project"**
3. Escolha **"Deploy from GitHub repo"**
4. Selecione o repositório `whatsapp-backend`
5. Railway detectará automaticamente o Dockerfile

### 3. Configurar Variáveis de Ambiente

No Railway, adicione as seguintes variáveis:

\`\`\`env
# MongoDB
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/saas-crm

# Redis (pode usar Railway Redis addon)
REDIS_HOST=redis-host
REDIS_PORT=6379
REDIS_PASSWORD=sua-senha

# JWT
JWT_SECRET=seu-jwt-secret-super-secreto
JWT_REFRESH_SECRET=seu-refresh-secret-ainda-mais-secreto

# API
PORT=5000
NODE_ENV=production

# CORS (URL do frontend na Vercel)
FRONTEND_URL=https://seu-app.vercel.app
\`\`\`

### 4. Adicionar Redis (Opcional)

Se não tiver Redis externo:

1. No Railway, clique em **"New"** → **"Database"** → **"Add Redis"**
2. Railway criará automaticamente as variáveis `REDIS_HOST`, `REDIS_PORT`, etc.

### 5. Adicionar MongoDB (Opcional)

Se não tiver MongoDB Atlas:

1. No Railway, clique em **"New"** → **"Database"** → **"Add MongoDB"**
2. Railway criará automaticamente a variável `MONGO_URL`

### 6. Deploy e Monitoramento

O Railway iniciará o build automaticamente. Você pode acompanhar:

- **Logs:** Aba "Deployments" → "View Logs"
- **Métricas:** Aba "Metrics"
- **URL:** Railway gerará uma URL pública para o backend

### 7. Conectar Frontend (Vercel) com Backend (Railway)

No seu projeto Vercel, adicione a variável de ambiente:

\`\`\`env
NEXT_PUBLIC_API_URL=https://seu-backend.railway.app
\`\`\`

## 🔧 Estrutura Esperada

O Railway espera esta estrutura no repositório:

\`\`\`
whatsapp-backend/
├── Dockerfile
├── package.json
├── index.js
├── config/
├── controllers/
├── models/
├── routes/
├── services/
├── workers/
└── whatsapp-sessions/ (criada automaticamente)
\`\`\`

## ⚠️ Notas Importantes

1. **Puppeteer:** O Dockerfile já inclui todas as dependências do Chromium necessárias para o WhatsApp Web.js
2. **Sessões:** As sessões do WhatsApp são efêmeras no Railway. Para persistir, use volume ou banco de dados.
3. **Custos:** Railway tem limite gratuito de 500h/mês. Depois disso cobra $5/mês base.
4. **Escalabilidade:** Para múltiplas instâncias, você precisará implementar persistência de sessões no Redis.

## 🐛 Troubleshooting

### Erro: "Puppeteer não encontra Chromium"

Verifique se o Dockerfile.backend tem as dependências corretas (já incluídas no arquivo).

### Erro: "Cannot connect to MongoDB"

Verifique se o IP do Railway está na whitelist do MongoDB Atlas (ou use `0.0.0.0/0` para permitir qualquer IP).

### Erro: "WhatsApp session expired"

Isso é normal. Reconecte escaneando o QR Code novamente através da interface.

## 🎯 Próximos Passos

Após deploy bem-sucedido:

1. ✅ Frontend na Vercel conectado ao backend Railway
2. ✅ MongoDB configurado e acessível
3. ✅ Redis funcionando para filas
4. ✅ Teste conectando uma sessão WhatsApp
5. ✅ Envie mensagens de teste

---

**Dúvidas?** Consulte a [documentação do Railway](https://docs.railway.app)
