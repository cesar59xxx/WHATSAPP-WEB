# 🚂 Deploy no Railway com Supabase

Este guia mostra como fazer deploy do backend WhatsApp no Railway usando Supabase como banco de dados.

## 📋 Pré-requisitos

- Conta no Railway (gratuita): https://railway.app
- Supabase já configurado no seu projeto v0/Vercel
- GitHub repository do projeto (opcional, mas recomendado)

---

## 🎯 Passo 1: Obter Variáveis do Supabase

### No v0 (Mais Fácil):
1. Abra o chat do seu projeto no v0
2. Clique em **"Connect"** na barra lateral esquerda
3. Clique em **"Supabase"**
4. Copie as seguintes variáveis:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

### Ou no Supabase Dashboard:
1. Acesse https://supabase.com/dashboard
2. Selecione seu projeto: **API-WHATSAPP-WEB**
3. Vá em **Settings** → **API**
4. Copie:
   - **URL**: `SUPABASE_URL`
   - **service_role key**: `SUPABASE_SERVICE_ROLE_KEY`

---

## 🚀 Passo 2: Deploy no Railway

### Opção A: Deploy via GitHub (Recomendado)

1. **Push do código para GitHub**
   \`\`\`bash
   git init
   git add .
   git commit -m "Setup backend com Supabase"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/seu-repo.git
   git push -u origin main
   \`\`\`

2. **Criar projeto no Railway**
   - Acesse https://railway.app
   - Clique em **"New Project"**
   - Selecione **"Deploy from GitHub repo"**
   - Autorize o Railway a acessar seu GitHub
   - Selecione o repositório do projeto

3. **Configurar build**
   - O Railway vai detectar automaticamente o Dockerfile
   - Certifique-se que está usando `Dockerfile.backend`
   - Se necessário, vá em **Settings** → **Build** → **Dockerfile Path** → `Dockerfile.backend`

### Opção B: Deploy via CLI do Railway

1. **Instalar Railway CLI**
   \`\`\`bash
   npm install -g @railway/cli
   \`\`\`

2. **Login no Railway**
   \`\`\`bash
   railway login
   \`\`\`

3. **Inicializar projeto**
   \`\`\`bash
   railway init
   \`\`\`

4. **Deploy**
   \`\`\`bash
   railway up
   \`\`\`

---

## ⚙️ Passo 3: Configurar Variáveis de Ambiente

1. No Railway Dashboard, clique no seu projeto
2. Clique em **"Variables"**
3. Clique em **"Raw Editor"**
4. Cole as seguintes variáveis (substitua os valores):

\`\`\`env
SUPABASE_URL=https://ldieqcofmincppqzownw.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-aqui
SUPABASE_ANON_KEY=sua-anon-key-aqui
NODE_ENV=production
PORT=3001
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
FRONTEND_URL=https://seu-app.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
\`\`\`

5. Clique em **"Deploy"** (canto superior direito)

---

## 🔗 Passo 4: Obter URL do Backend

1. Após o deploy, o Railway vai gerar uma URL pública
2. Clique em **"Settings"** → **"Networking"**
3. Copie a URL gerada (algo como: `https://seu-backend.up.railway.app`)
4. Anote essa URL - você vai precisar dela no frontend

---

## 🌐 Passo 5: Conectar Frontend ao Backend

1. Volte para o seu projeto no v0/Vercel
2. Vá em **Settings** → **Environment Variables** (ou use a sidebar "Vars" no v0)
3. Adicione a variável:
   \`\`\`
   NEXT_PUBLIC_BACKEND_URL=https://seu-backend.up.railway.app
   \`\`\`
4. Faça redeploy do frontend na Vercel

---

## ✅ Passo 6: Testar a Conexão

### 1. Testar Health Check
Abra no navegador:
\`\`\`
https://seu-backend.up.railway.app/api/health
\`\`\`

Deve retornar:
\`\`\`json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.45,
  "database": "connected"
}
\`\`\`

### 2. Testar no Frontend
1. Acesse seu app na Vercel
2. Faça login
3. Vá em "WhatsApp" no menu
4. Tente criar uma nova sessão
5. O QR Code deve aparecer

---

## 🐛 Troubleshooting

### ❌ Erro: "SUPABASE_URL is required"
**Solução:** Verifique se configurou as variáveis de ambiente corretamente no Railway

### ❌ Erro: "Build failed - chromium not found"
**Solução:** O Dockerfile.backend deve instalar o chromium automaticamente. Verifique se está usando o Dockerfile correto.

### ❌ Erro: "CORS policy blocked"
**Solução:** 
1. Verifique se `FRONTEND_URL` no Railway está configurado com a URL correta do Vercel
2. Certifique-se que não tem barra `/` no final da URL

### ❌ Backend não conecta ao Supabase
**Solução:**
1. Verifique se o `SUPABASE_SERVICE_ROLE_KEY` está correto (não use a ANON_KEY)
2. Verifique se a URL do Supabase está correta
3. Verifique os logs no Railway: `railway logs`

### 📊 Ver Logs do Railway
\`\`\`bash
railway logs
\`\`\`

Ou no dashboard: **Deployments** → clique no deploy → **View Logs**

---

## 💰 Custos

- **Railway Free Tier**: 
  - $5 de crédito grátis por mês
  - 500 horas de execução
  - Suficiente para testes e projetos pequenos

- **Supabase Free Tier**:
  - 500 MB de banco de dados
  - 1 GB de transferência
  - 50 MB de storage
  - 2 projetos simultâneos

---

## 🎉 Pronto!

Seu backend WhatsApp agora está rodando no Railway conectado ao Supabase, e o frontend na Vercel pode se comunicar com ele para gerenciar sessões WhatsApp em tempo real!

## 📚 Próximos Passos

1. Configure domínio customizado no Railway (opcional)
2. Configure SSL/HTTPS (automático no Railway)
3. Configure monitoring e alertas
4. Escale conforme necessário (Railway faz auto-scaling)
