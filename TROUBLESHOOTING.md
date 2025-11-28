# 🔧 Troubleshooting - Problemas Comuns

## Problemas de Conexão WhatsApp

### QR Code não aparece

**Sintomas:**
- Botão "Conectar" clicado mas nada acontece
- Diálogo abre mas fica carregando

**Soluções:**
\`\`\`bash
# 1. Verificar se o backend está rodando
curl http://localhost:3001/health

# 2. Verificar logs do backend
# Procure por erros relacionados a Puppeteer

# 3. Reinstalar dependências do Puppeteer
cd server
npm install puppeteer

# 4. No Linux, instalar dependências do Chrome
sudo apt-get install -y \
  gconf-service libasound2 libatk1.0-0 libc6 libcairo2 \
  libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 \
  libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 \
  libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 \
  libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 \
  libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 \
  libxss1 libxtst6 ca-certificates fonts-liberation \
  libappindicator1 libnss3 lsb-release xdg-utils wget
\`\`\`

### Sessão desconecta sozinha

**Sintomas:**
- Conexão funciona mas cai após alguns minutos
- Status alterna entre conectado e desconectado

**Soluções:**
1. Verificar se há múltiplas instâncias do backend rodando
2. Aumentar timeout do Puppeteer em `server/services/whatsapp-manager.service.js`
3. Verificar memória RAM disponível (mínimo 2GB por sessão)
4. Desabilitar modo headless temporariamente para debug

### Erro "Could not find Chrome"

**Solução:**
\`\`\`bash
# Instalar Chromium manualmente
npx puppeteer browsers install chrome

# Ou especificar caminho customizado
export PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome
\`\`\`

---

## Problemas de Mensagens

### Mensagens não são enviadas

**Verificar:**
1. Status da sessão está "Conectado" (verde)?
2. Número do contato está correto (+5511999999999)?
3. Há mensagens de erro no console do navegador?

**Debug:**
\`\`\`javascript
// Abrir DevTools (F12) e verificar:
// 1. Aba Network - procurar falha em POST /api/whatsapp/send
// 2. Aba Console - procurar erros em vermelho

// Testar envio manual via API
fetch('http://localhost:3001/api/whatsapp/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer SEU_TOKEN_AQUI'
  },
  body: JSON.stringify({
    sessionId: 'session-id-aqui',
    contactId: 'contact-id-aqui',
    content: { text: 'Teste' },
    type: 'text'
  })
})
\`\`\`

### Mensagens recebidas não aparecem no Inbox

**Verificar:**
1. WebSocket está conectado? (Badge verde no header)
2. Contato existe no CRM?

**Debug:**
\`\`\`javascript
// No console do navegador:
console.log(window.io) // Deve retornar objeto Socket.IO

// Verificar eventos:
socket.on('message:new', (data) => {
  console.log('[DEBUG] Nova mensagem:', data)
})
\`\`\`

---

## Problemas de Performance

### Sistema está lento

**Causas comuns:**
1. MongoDB sem índices
2. Redis não configurado
3. Muitas sessões abertas
4. Falta de recursos (CPU/RAM)

**Soluções:**
\`\`\`bash
# 1. Criar índices MongoDB
mongosh whatsapp_crm_db
db.contacts.createIndex({ phoneNumber: 1 })
db.messages.createIndex({ contactId: 1, timestamp: -1 })
db.contacts.createIndex({ tenantId: 1, lastInteraction: -1 })

# 2. Verificar uso de memória
docker stats # Se usando Docker
ps aux | grep node # Processos Node.js

# 3. Limpar cache Redis
redis-cli FLUSHDB

# 4. Aumentar worker threads
# No .env:
QUEUE_WORKERS=4
\`\`\`

### Filas do Redis travadas

**Sintomas:**
- Mensagens não são processadas
- Dashboard do Bull mostra jobs "stuck"

**Soluções:**
\`\`\`bash
# Conectar no Redis
redis-cli

# Verificar filas
KEYS bull:message-queue:*

# Limpar jobs travados
DEL bull:message-queue:failed
DEL bull:message-queue:stuck

# Reiniciar worker
npm run worker
\`\`\`

---

## Problemas de Autenticação

### Token expirado constantemente

**Verificar:**
\`\`\`javascript
// No .env, ajustar tempos:
JWT_ACCESS_EXPIRY=1h
JWT_REFRESH_EXPIRY=7d
\`\`\`

### Logout automático

**Causas:**
1. Refresh token não está sendo salvo
2. Cookie httpOnly bloqueado
3. Hora do servidor incorreta

**Debug:**
\`\`\`javascript
// No navegador:
localStorage.getItem('accessToken')
localStorage.getItem('refreshToken')

// Verificar hora do servidor:
// Backend deve estar sincronizado com NTP
\`\`\`

---

## Problemas de Deploy

### Erro ao fazer build do Next.js

\`\`\`bash
# Limpar cache
rm -rf .next
rm -rf node_modules
npm install
npm run build

# Se persistir, verificar versão do Node
node -v # Deve ser >= 18.0.0
\`\`\`

### MongoDB não conecta em produção

**Verificar:**
1. String de conexão correta
2. IP liberado no MongoDB Atlas
3. Usuário tem permissões

\`\`\`bash
# Testar conexão:
mongosh "mongodb+srv://user:pass@cluster.mongodb.net/dbname"
\`\`\`

### Redis não conecta

\`\`\`bash
# Verificar se está rodando:
redis-cli ping
# Deve retornar: PONG

# Se não estiver:
redis-server

# Em produção (Docker):
docker ps | grep redis
docker logs redis-container
\`\`\`

---

## Logs e Debug

### Ativar modo debug completo

\`\`\`bash
# .env
NODE_ENV=development
DEBUG=whatsapp:*,socket:*
LOG_LEVEL=debug

# Logs serão mais verbosos
npm run dev:backend
\`\`\`

### Localizar logs

\`\`\`bash
# Backend logs:
tail -f server/logs/app.log
tail -f server/logs/error.log

# PM2 (produção):
pm2 logs backend
pm2 logs worker

# Docker:
docker logs -f saas-backend
docker logs -f saas-worker
\`\`\`

### Monitoramento em tempo real

\`\`\`javascript
// Adicionar no backend para debug:
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
})
\`\`\`

---

## Contato de Suporte Técnico

Se o problema persistir:

1. Colete informações:
   - Versão do Node.js (`node -v`)
   - Sistema operacional
   - Logs de erro completos
   - Passos para reproduzir

2. Crie um ticket com essas informações
3. Para problemas críticos, use o chat ao vivo

**Email:** tech-support@whatsappcrm.com
**Discord:** https://discord.gg/whatsappcrm
