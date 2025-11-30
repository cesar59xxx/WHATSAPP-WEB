# 🚀 Como Configurar o Backend no Railway - PASSO A PASSO

## ✅ Passo 1: Fazer Deploy no Railway

1. Acesse [railway.app](https://railway.app) e faça login
2. Clique em **"New Project"**
3. Selecione **"Deploy from GitHub repo"**
4. Conecte seu repositório do GitHub
5. Selecione o repositório deste projeto

## ✅ Passo 2: Configurar Dockerfile

No Railway, após criar o projeto:

1. Vá em **Settings** → **Build**
2. Em **Build Command**, deixe vazio (o Dockerfile cuida de tudo)
3. Em **Dockerfile Path**, coloque: `Dockerfile.backend`
4. Salve as configurações

## ✅ Passo 3: Adicionar Variáveis de Ambiente

Vá em **Variables** e adicione EXATAMENTE estas variáveis:

### Variáveis do Supabase (suas credenciais reais):

\`\`\`bash
SUPABASE_URL=https://ldieqcofmincppqzownw.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkaWVxY29mbWluY3BwcXpvd253Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDI1NTY4MiwiZXhwIjoyMDc5ODMxNjgyfQ.uACDWkYujDnvXUeeeipzE5U_GichTZfFOvikR9CReZc
\`\`\`

### Variáveis de Configuração:

\`\`\`bash
NODE_ENV=production
PORT=3001
\`\`\`

### Variável CORS (adicionar depois que deploy do frontend):

\`\`\`bash
FRONTEND_URL=https://seu-app.vercel.app
\`\`\`

## ✅ Passo 4: Deploy Automático

1. Após adicionar as variáveis, clique em **"Deploy"** ou faça um novo commit no GitHub
2. O Railway vai:
   - Buildar a imagem Docker
   - Instalar Chromium e dependências do WhatsApp Web
   - Iniciar o servidor na porta 3001
3. Aguarde 2-3 minutos para o build completar

## ✅ Passo 5: Pegar a URL do Backend

1. Após o deploy bem-sucedido, vá em **Settings** → **Networking**
2. Clique em **"Generate Domain"**
3. Copie a URL gerada (exemplo: `https://seu-backend.railway.app`)
4. **IMPORTANTE**: Guarde essa URL, você vai precisar dela no frontend!

## ✅ Passo 6: Atualizar Frontend na Vercel

Agora você precisa conectar o frontend (Vercel) ao backend (Railway):

1. Vá no seu projeto na Vercel
2. Settings → Environment Variables
3. Adicione a variável:

\`\`\`bash
NEXT_PUBLIC_API_URL=https://seu-backend.railway.app
\`\`\`

4. Faça um novo deploy do frontend para aplicar as mudanças

## ✅ Passo 7: Atualizar CORS no Railway

Depois que o frontend estiver no ar:

1. Volte no Railway
2. Variables → Editar `FRONTEND_URL`
3. Coloque a URL real do Vercel: `https://seu-app.vercel.app`
4. Faça redeploy (Settings → Redeploy)

## 🧪 Testar se Está Funcionando

### Teste 1: Backend está rodando?
Acesse no navegador: `https://seu-backend.railway.app/health`

Deve retornar:
\`\`\`json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
\`\`\`

### Teste 2: Backend conecta com Supabase?
Acesse: `https://seu-backend.railway.app/api/whatsapp/sessions`

Deve retornar:
\`\`\`json
{
  "sessions": []
}
\`\`\`

### Teste 3: Frontend conecta com Backend?
1. Abra seu frontend na Vercel
2. Faça login
3. Vá em "WhatsApp" no menu
4. Deve aparecer a tela de conexão WhatsApp sem erros

## 🐛 Problemas Comuns

### Erro: "Cannot connect to Supabase"
- Verifique se as variáveis `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` estão corretas
- Confirme que não tem espaços no início/fim das variáveis

### Erro: "CORS policy blocked"
- Adicione a variável `FRONTEND_URL` com a URL exata do Vercel
- Faça redeploy do backend no Railway

### Erro: "Chromium not found"
- Verifique se está usando `Dockerfile.backend` e não `Dockerfile`
- O Dockerfile.backend já instala o Chromium automaticamente

### Backend demora muito para iniciar
- Normal na primeira vez (2-3 minutos)
- O Railway precisa baixar a imagem, instalar dependências e Chromium

## 📊 Monitoramento

Para ver os logs do backend:

1. No Railway, clique no seu projeto
2. Vá em **Deployments** → Último deploy
3. Clique em **View Logs**
4. Você verá os logs em tempo real

Logs esperados:
\`\`\`
✓ Supabase connected successfully
✓ Server running on port 3001
✓ Health check endpoint: /health
\`\`\`

## 🎉 Pronto!

Agora você tem:
- ✅ Frontend rodando na Vercel com Next.js + Supabase Auth
- ✅ Backend rodando no Railway com Express + WhatsApp Web.js
- ✅ Database no Supabase com todas as tabelas criadas
- ✅ Sistema completo funcionando em produção!

## 🔐 Segurança

**IMPORTANTE**: Nunca compartilhe sua `SUPABASE_SERVICE_ROLE_KEY` publicamente! 
Esta chave tem acesso total ao banco de dados.

Se você acidentalmente expor ela:
1. Vá no Supabase Dashboard
2. Settings → API
3. Clique em "Reset service_role key"
4. Atualize a variável no Railway
