# 🚂 Setup Completo do Backend no Railway

## 📋 Pré-requisitos

Você precisa de:
- Conta no Railway (https://railway.app)
- MongoDB Atlas (https://www.mongodb.com/cloud/atlas) - Plano gratuito
- Conta Upstash Redis (https://upstash.com) - Plano gratuito

---

## ⚙️ Passo 1: Criar Banco MongoDB Atlas

1. Acesse https://www.mongodb.com/cloud/atlas
2. Crie uma conta gratuita
3. Crie um novo cluster (M0 Free Tier)
4. Em "Database Access", crie um usuário com senha
5. Em "Network Access", adicione `0.0.0.0/0` (permitir de qualquer lugar)
6. Clique em "Connect" → "Connect your application"
7. Copie a string de conexão (formato: `mongodb+srv://usuario:senha@cluster.mongodb.net/`)
8. Substitua `<password>` pela sua senha
9. Adicione o nome do banco no final: `mongodb+srv://usuario:senha@cluster.mongodb.net/whatsapp-crm`

**String final:** `mongodb+srv://usuario:senha@cluster.mongodb.net/whatsapp-crm`

---

## 🔴 Passo 2: Criar Redis no Upstash

1. Acesse https://console.upstash.com
2. Crie uma conta
3. Crie um novo banco Redis
4. Copie:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

---

## 🚂 Passo 3: Deploy no Railway

### A) Criar Novo Projeto

1. Acesse https://railway.app
2. Clique em "New Project"
3. Escolha "Deploy from GitHub repo"
4. Selecione seu repositório
5. Railway vai detectar o `Dockerfile.backend` automaticamente

### B) Configurar Variáveis de Ambiente

No Railway, vá em **Variables** e adicione:

\`\`\`bash
# MongoDB (obrigatório)
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/whatsapp-crm

# Redis (obrigatório)
REDIS_URL=redis://default:sua-senha@redis-host:6379
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=seu-token-upstash

# JWT (crie senhas fortes aleatórias)
JWT_SECRET=sua-chave-secreta-super-segura-minimo-32-caracteres
JWT_REFRESH_SECRET=outra-chave-secreta-diferente-minimo-32-caracteres

# Configurações Node
NODE_ENV=production
PORT=3001

# Puppeteer (necessário para WhatsApp)
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
\`\`\`

### C) Dockerfile Correto

Certifique-se de usar o `Dockerfile.backend`. No Railway:

1. Vá em **Settings**
2. Em **Build**, configure:
   - **Dockerfile Path**: `Dockerfile.backend`
   - **Docker Context**: `.` (raiz)

### D) Deploy

1. Clique em **Deploy**
2. Aguarde o build (pode demorar 5-10 minutos na primeira vez)
3. O Railway vai gerar uma URL pública

---

## 🔍 Verificar se Está Funcionando

### 1. Verificar Logs

No Railway, vá em **Deployments** → clique no deploy → **View Logs**

Você deve ver:
\`\`\`
[Server] Servidor rodando na porta 3001
[Server] MongoDB conectado com sucesso
[Server] Redis conectado
[WhatsApp Manager] Sistema iniciado
\`\`\`

### 2. Testar API

Abra a URL do Railway + `/api/health`:
\`\`\`
https://seu-app.railway.app/api/health
\`\`\`

Resposta esperada:
\`\`\`json
{
  "status": "ok",
  "mongodb": "connected",
  "redis": "connected"
}
\`\`\`

---

## 🔗 Conectar Frontend com Backend

Depois que o backend estiver rodando, você precisa configurar o frontend:

### No v0/Vercel (onde está seu Next.js):

Adicione as variáveis de ambiente:

\`\`\`bash
# URL do seu backend no Railway
NEXT_PUBLIC_API_URL=https://seu-app.railway.app

# Variáveis do Supabase (já configuradas)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
\`\`\`

---

## 🐛 Problemas Comuns

### ❌ Erro: MongoDB URI undefined

**Causa:** Variável `MONGODB_URI` não configurada

**Solução:**
1. Vá em Railway → Variables
2. Adicione `MONGODB_URI` com a string do MongoDB Atlas
3. Faça redeploy

### ❌ Erro: MongoNetworkError

**Causa:** MongoDB não permite conexões do Railway

**Solução:**
1. No MongoDB Atlas → Network Access
2. Adicione `0.0.0.0/0` (permitir de qualquer IP)
3. Aguarde 2-3 minutos

### ❌ Erro: Redis connection refused

**Causa:** URL do Redis incorreta

**Solução:**
1. Verifique se as variáveis `REDIS_URL` ou `UPSTASH_REDIS_REST_URL` estão corretas
2. No Upstash, copie novamente as credenciais

### ❌ Build falha: chromium not found

**Causa:** Dockerfile incorreto

**Solução:**
1. Certifique-se de usar `Dockerfile.backend`
2. Em Railway Settings → Build → Dockerfile Path: `Dockerfile.backend`

---

## 📊 Monitoramento

### Logs em Tempo Real

\`\`\`bash
# No Railway, você pode ver logs em tempo real na interface
# Ou usar Railway CLI:
railway logs
\`\`\`

### Métricas

Railway mostra automaticamente:
- CPU usage
- Memory usage
- Network traffic
- Restart count

---

## 💰 Custos

### Railway (Backend)
- **Plano Hobby**: $5/mês (500 horas)
- **Plano Pro**: $20/mês (ilimitado)

### MongoDB Atlas
- **M0 (Free)**: 512MB - Suficiente para começar
- **M10**: $0.08/hora - Para produção

### Upstash Redis
- **Free**: 10,000 comandos/dia
- **Pay as you go**: $0.2 por 100k comandos

---

## ✅ Checklist Final

- [ ] MongoDB Atlas criado e configurado
- [ ] Upstash Redis criado
- [ ] Variáveis de ambiente configuradas no Railway
- [ ] Deploy bem-sucedido
- [ ] Logs mostram conexões OK
- [ ] Endpoint `/api/health` responde
- [ ] Frontend configurado com URL do backend

---

## 🆘 Precisa de Ajuda?

Se continuar com problemas:

1. **Verifique os logs no Railway** - Eles mostram o erro exato
2. **Teste as variáveis** - Copie e cole novamente do MongoDB/Upstash
3. **Aguarde o build completo** - Pode demorar 10 minutos na primeira vez
4. **Verifique o Network Access no MongoDB** - Deve permitir `0.0.0.0/0`

**Dica:** Comece configurando apenas MongoDB e JWT_SECRET. Adicione Redis depois se necessário.
