# Arquitetura Detalhada do Sistema

Este documento descreve a arquitetura técnica completa do SaaS CRM + Chatbot Omnichannel.

## Visão Geral

\`\`\`
┌─────────────────┐
│   Next.js App   │
│   (Frontend)    │
└────────┬────────┘
         │ HTTP/WS
         ▼
┌─────────────────┐
│  Express API    │
│  (Backend)      │
└────┬───┬───┬────┘
     │   │   │
     ▼   ▼   ▼
┌─────┐ ┌─────┐ ┌──────────┐
│Mongo│ │Redis│ │WhatsApp  │
│ DB  │ │Queue│ │Web Client│
└─────┘ └─────┘ └──────────┘
\`\`\`

## Camadas do Sistema

### 1. Camada de Apresentação (Frontend)

**Tecnologias:**
- Next.js 16 com App Router
- React Server Components + Client Components
- Tailwind CSS v4 para estilização
- Zustand para state management
- Socket.IO Client para real-time

**Estrutura de Rotas:**

\`\`\`
/                          → Landing page (pública)
/(auth)/
  /login                   → Autenticação
  /register                → Cadastro de novo tenant
/(dashboard)/              → Layout protegido com sidebar
  /dashboard               → Visão geral e estatísticas
  /inbox                   → Chat em tempo real
  /contacts                → Lista e gestão de contatos
  /pipeline                → Kanban view do funil
  /chatbots                → Listagem de fluxos
  /chatbots/[id]           → Editor visual de fluxo
  /whatsapp                → Gerenciar sessões WhatsApp
  /settings                → Configurações do tenant
/(admin)/
  /admin                   → Painel superadmin
\`\`\`

**Autenticação Frontend:**

\`\`\`typescript
// Fluxo de autenticação
1. useAuthStore → Zustand store com estado do usuário
2. AuthProvider → Verifica token ao montar app
3. middleware.ts → Protege rotas, redireciona não autenticados
4. api-client.ts → Intercepta requisições, adiciona token, renova se expirado
\`\`\`

**Comunicação Real-time:**

\`\`\`typescript
// Socket.IO connection
const socket = io(SOCKET_URL, {
  auth: { token: accessToken }
})

// Entrar na room do tenant
socket.emit('join:tenant', { tenantId })

// Escutar eventos
socket.on('message:new', handleNewMessage)
socket.on('session:qr', handleQRCode)
\`\`\`

### 2. Camada de API (Backend)

**Arquitetura em Camadas:**

\`\`\`
Request → Middleware → Route → Controller → Service → Model → Database
\`\`\`

**Middlewares (Ordem de execução):**

1. **helmet** - Headers de segurança
2. **cors** - Cross-origin requests
3. **compression** - Gzip response
4. **express.json** - Parse JSON body
5. **rateLimiter** - Limite de requisições
6. **authenticate** - Valida JWT
7. **extractTenant** - Adiciona tenantId
8. **authorize** - Verifica permissions

**Controllers:**

Responsáveis por:
- Validar input (req.body, req.query, req.params)
- Chamar services
- Formatar response
- Tratamento de erros

**Services:**

Lógica de negócio:
- `whatsapp-manager.service.js` - Gerencia clients WhatsApp
- `chatbot.service.js` - Executa fluxos de automação
- Outros services conforme necessário

**Models (Mongoose):**

\`\`\`javascript
// Hierarquia de dados
Tenant (Cliente do SaaS)
  └─ User (Agentes/Admin do tenant)
  └─ WhatsAppSession (Números conectados)
  └─ Contact (Contatos CRM)
      └─ Message (Histórico de mensagens)
  └─ ChatbotFlow (Automações)
\`\`\`

### 3. Camada de Dados

**MongoDB (Banco Principal):**

Armazena:
- Dados estruturados (tenants, users, contacts, messages)
- Configurações de chatbot
- Metadados de sessões

**Índices Importantes:**

\`\`\`javascript
// Performance critical indexes
{ tenantId: 1, createdAt: -1 }  // Listagem por tenant
{ contactId: 1, createdAt: -1 } // Mensagens de um contato
{ tenantId: 1, status: 1 }      // Sessões ativas
{ tenantId: 1, pipelineStage: 1 } // Pipeline filtering
\`\`\`

**Redis (Cache e Filas):**

Usa para:
- Filas Bull (processamento assíncrono)
- Cache de sessão (opcional)
- Rate limiting
- Pub/Sub para eventos

### 4. Camada de Integração WhatsApp

**whatsapp-web.js Architecture:**

\`\`\`
WhatsAppManagerService
  │
  ├─ Client Map (sessionId → Client instance)
  │
  └─ Para cada Client:
      ├─ Puppeteer instance
      │   └─ Chrome headless
      │       └─ WhatsApp Web carregado
      │
      ├─ LocalAuth Strategy
      │   └─ Salva em: ./whatsapp-sessions/session-{id}/
      │
      └─ Event Listeners:
          ├─ qr → Emite via WebSocket
          ├─ ready → Update status no DB
          ├─ authenticated → Conectado
          ├─ message → Processa mensagem
          ├─ message_create → Mensagem enviada
          └─ disconnected → Tenta reconectar
\`\`\`

**Fluxo de Conexão:**

\`\`\`
1. Frontend: Criar nova sessão
   POST /whatsapp/sessions { name: "Atendimento" }

2. Backend: Instancia novo Client
   const client = new Client({
     authStrategy: new LocalAuth({
       clientId: `session-${tenantId}-${sessionId}`
     }),
     puppeteer: {
       headless: true,
       args: ['--no-sandbox']
     }
   })

3. Backend: Registra event listeners
   client.on('qr', qr => {
     io.to(`tenant:${tenantId}`).emit('session:qr', { sessionId, qr })
   })

4. Backend: Inicializa client
   await client.initialize()

5. Frontend: Recebe QR via WebSocket
   socket.on('session:qr', ({ qr }) => {
     // Renderiza QR code
   })

6. Usuário: Escaneia QR com WhatsApp

7. WhatsApp: Autentica e conecta

8. Backend: Evento 'ready' dispara
   client.on('ready', () => {
     WhatsAppSession.update({ status: 'connected' })
     io.emit('session:ready', { sessionId })
   })

9. Sistema: Pronto para enviar/receber
\`\`\`

**Persistência de Sessão:**

LocalAuth salva no filesystem:
\`\`\`
whatsapp-sessions/
└─ session-{tenantId}-{sessionId}/
   ├─ Default/
   │  ├─ Cookies
   │  ├─ Local Storage
   │  └─ IndexedDB
   └─ session.json
\`\`\`

Na próxima inicialização, não precisa QR Code.

**Reconexão Automática:**

\`\`\`javascript
client.on('disconnected', async (reason) => {
  console.log('[WhatsApp] Desconectado:', reason)
  
  // Aguarda 5 segundos
  await new Promise(resolve => setTimeout(resolve, 5000))
  
  // Tenta reconectar
  try {
    await client.initialize()
    console.log('[WhatsApp] Reconectado com sucesso')
  } catch (error) {
    console.error('[WhatsApp] Falha ao reconectar:', error)
    // Marca como disconnected no DB
    await WhatsAppSession.updateOne(
      { _id: sessionId },
      { status: 'disconnected' }
    )
  }
})
\`\`\`

### 5. Sistema de Filas (Bull + Redis)

**Por que filas?**

Mensagens WhatsApp são lentas:
- Rate limit do WhatsApp (~100 msg/minuto)
- Latência de rede
- Processamento assíncrono evita timeout HTTP

**Arquitetura da Fila:**

\`\`\`
API Request
  ↓
Add to Queue (Redis)
  ↓
Worker consome
  ↓
Envia via WhatsApp
  ↓
Atualiza status no MongoDB
  ↓
Emite evento via WebSocket
\`\`\`

**Implementação:**

\`\`\`javascript
// message.queue.js
import Bull from 'bull'

export const messageQueue = new Bull('messageQueue', {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
})

// Adicionar job
await messageQueue.add('send-message', {
  sessionId,
  contactId,
  messageData: { text, mediaUrl }
}, {
  attempts: 3, // Tenta até 3x
  backoff: {
    type: 'exponential',
    delay: 2000
  }
})

// Worker processa
messageQueue.process('send-message', async (job) => {
  const { sessionId, contactId, messageData } = job.data
  
  const client = whatsappManager.getClient(sessionId)
  const contact = await Contact.findById(contactId)
  
  await client.sendMessage(contact.phone, messageData.text)
  
  return { success: true }
})
\`\`\`

**Monitoramento da Fila:**

\`\`\`javascript
// Ver jobs pendentes
const waiting = await messageQueue.getWaiting()
const active = await messageQueue.getActive()
const failed = await messageQueue.getFailed()

// Limpar jobs antigos
await messageQueue.clean(24 * 3600 * 1000) // 24h
\`\`\`

### 6. Sistema de Chatbot

**Estrutura de um Fluxo:**

\`\`\`javascript
{
  name: "Boas-vindas",
  isActive: true,
  nodes: [
    {
      id: "trigger-1",
      type: "trigger",
      config: {
        triggerType: "keyword",
        keywords: ["oi", "olá", "hey"]
      }
    },
    {
      id: "message-1",
      type: "message",
      config: {
        text: "Olá {{nome}}! Como posso ajudar?"
      }
    }
  ],
  edges: [
    { source: "trigger-1", target: "message-1" }
  ]
}
\`\`\`

**Tipos de Nós:**

1. **Trigger** - Inicia o fluxo
   - keyword: mensagem contém palavra
   - schedule: horário específico
   - pipeline: contato entrou em etapa

2. **Message** - Envia mensagem
   - Suporta variáveis: {{nome}}, {{telefone}}
   - Texto simples

3. **Condition** - Decisão if/else
   - Compara campo com valor
   - Operadores: equals, contains, notEquals

4. **Action** - Executa ação
   - Adiciona tag
   - Move no pipeline
   - Notifica agente

5. **Delay** - Aguarda tempo
   - Minutes, hours, days

**Executor de Fluxo:**

\`\`\`javascript
// chatbot.service.js
export async function executeFlow(flowId, contactId, messageText) {
  const flow = await ChatbotFlow.findById(flowId)
  const contact = await Contact.findById(contactId)
  
  // Encontrar nó inicial (trigger)
  const triggerNode = flow.nodes.find(n => n.type === 'trigger')
  
  // Verificar se trigger match
  if (!checkTrigger(triggerNode, messageText)) return
  
  // Executar nós em sequência
  let currentNodeId = triggerNode.id
  
  while (currentNodeId) {
    const node = flow.nodes.find(n => n.id === currentNodeId)
    
    switch (node.type) {
      case 'message':
        await sendMessage(contact, node.config.text)
        break
      case 'condition':
        currentNodeId = evaluateCondition(node, contact)
        continue
      case 'action':
        await executeAction(node, contact)
        break
      case 'delay':
        await scheduleNext(node, contactId, nextNodeId)
        return // Sai e agenda próximo
    }
    
    // Próximo nó
    const edge = flow.edges.find(e => e.source === currentNodeId)
    currentNodeId = edge?.target
  }
}
\`\`\`

**Variáveis Dinâmicas:**

\`\`\`javascript
function replaceVariables(text, contact) {
  return text
    .replace(/{{nome}}/g, contact.name)
    .replace(/{{telefone}}/g, contact.phone)
    .replace(/{{email}}/g, contact.email)
}
\`\`\`

### 7. WebSocket Real-time

**Eventos e Rooms:**

\`\`\`javascript
// socket.handler.js
io.use(authenticateSocket) // Valida JWT

io.on('connection', (socket) => {
  const { tenantId, userId } = socket.user
  
  // Entrar na room do tenant
  socket.join(`tenant:${tenantId}`)
  
  // Eventos de mensagem
  socket.on('message:send', async (data) => {
    await messageQueue.add('send-message', data)
  })
  
  socket.on('message:typing', () => {
    socket.to(`tenant:${tenantId}`).emit('user:typing', { userId })
  })
})

// Emitir para todos do tenant
io.to(`tenant:${tenantId}`).emit('message:new', messageData)

// Emitir para usuário específico
io.to(socketId).emit('notification', data)
\`\`\`

**Sincronização de Estado:**

Quando mensagem é enviada:
1. Frontend envia via WebSocket
2. Backend adiciona à fila
3. Worker processa
4. Backend emite 'message:sent' via WebSocket
5. Frontend atualiza UI

### 8. Segurança

**Autenticação JWT:**

\`\`\`javascript
// Tokens
{
  accessToken: {
    payload: { userId, tenantId, role },
    expiresIn: '15m'
  },
  refreshToken: {
    payload: { userId },
    expiresIn: '7d'
  }
}

// Refresh flow
POST /auth/refresh
Body: { refreshToken }
Response: { accessToken, refreshToken }
\`\`\`

**Autorização por Role:**

\`\`\`javascript
// Roles hierarchy
superadmin > admin > agent

// Middleware
authorize('admin') // Permite admin e superadmin
authorize('agent')  // Permite todos
authorize('superadmin') // Apenas superadmin
\`\`\`

**Multi-tenant Isolation:**

\`\`\`javascript
// Middleware extractTenant
req.tenantId = req.user.tenantId

// Todos os queries filtram por tenant
Contact.find({ tenantId: req.tenantId })
\`\`\`

**Rate Limiting:**

\`\`\`javascript
// 100 requests por 15 min
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
})

app.use('/api/', limiter)
\`\`\`

**Validação de Input:**

\`\`\`javascript
// Zod schemas
const createContactSchema = z.object({
  name: z.string().min(1).max(100),
  phone: z.string().regex(/^\d{10,15}$/),
  email: z.string().email().optional()
})
\`\`\`

## Fluxos Completos

### Fluxo: Receber Mensagem WhatsApp

\`\`\`
1. WhatsApp → Mensagem recebida
2. whatsapp-web.js → Evento 'message'
3. Event handler:
   a. Buscar/criar Contact
   b. Salvar Message no MongoDB
   c. Verificar chatbots ativos
   d. Executar flows que dão match
   e. Emitir via WebSocket para frontend
4. Frontend → Atualiza inbox em tempo real
\`\`\`

### Fluxo: Enviar Mensagem

\`\`\`
1. Frontend → Usuário digita e envia
2. Socket.IO → Emite 'message:send'
3. Backend → Valida e adiciona à fila
4. Worker → Consome job da fila
5. WhatsApp Client → Envia mensagem
6. Callback → Atualiza status no MongoDB
7. WebSocket → Emite 'message:sent'
8. Frontend → Marca como enviada
\`\`\`

### Fluxo: Mover Contato no Pipeline

\`\`\`
1. Frontend → Arrasta card no kanban
2. API → PUT /contacts/:id
   Body: { pipelineStage: 'qualified' }
3. Controller → Valida e atualiza
4. Service → Verifica se mudou etapa
5. Chatbot → Busca flows com trigger pipeline
6. Executor → Roda automações
7. WebSocket → Notifica mudança
8. Frontend → Atualiza kanban
\`\`\`

## Escalabilidade

### Horizontal Scaling

**Desafios:**
- whatsapp-web.js mantém estado em memória
- Sessões persistidas em filesystem

**Soluções:**

1. **Load Balancer com Sticky Sessions:**
\`\`\`
User → LB → Sempre mesmo servidor
  ├─ Server 1 (Sessões A, B, C)
  ├─ Server 2 (Sessões D, E, F)
  └─ Server 3 (Sessões G, H, I)
\`\`\`

2. **RemoteAuth Strategy:**
\`\`\`javascript
// Salva sessão no MongoDB ao invés de disco
new RemoteAuth({
  store: new MongoStore({ mongoose }),
  backupSyncIntervalMs: 60000
})
\`\`\`

3. **Microserviços:**
\`\`\`
Frontend → API Gateway
  ├─ Auth Service
  ├─ Contact Service
  ├─ Message Service
  └─ WhatsApp Service (stateful)
\`\`\`

### Vertical Scaling

Para 1000+ sessões simultâneas:
- 16GB+ RAM (Puppeteer consome ~100MB por sessão)
- SSD para I/O rápido
- Multi-core CPU para workers

### Otimizações de Performance

**Database:**
- Índices compostos
- Agregações eficientes
- Connection pooling

**Cache:**
- Redis para dados frequentes
- TTL configurável

**CDN:**
- Assets estáticos
- Imagens de perfil

**Lazy Loading:**
- Mensagens paginadas
- Contatos carregados sob demanda

## Monitoramento

**Métricas Importantes:**

- Sessões WhatsApp conectadas
- Fila Redis (tamanho, latência)
- Tempo de resposta API
- Taxa de erro
- Uso de memória/CPU
- Taxa de reconexão WhatsApp

**Ferramentas:**

- PM2 para logs e restart
- Bull Board para monitorar filas
- MongoDB Atlas monitoring
- Redis Commander

## Conclusão

Este sistema foi arquitetado para ser:
- **Escalável**: Suporta crescimento horizontal e vertical
- **Resiliente**: Reconexão automática, filas com retry
- **Seguro**: Autenticação JWT, isolamento multi-tenant
- **Performático**: Filas assíncronas, cache, índices otimizados
- **Manutenível**: Código organizado em camadas, bem documentado

A arquitetura permite evolução incremental, adição de features sem breaking changes, e manutenção simplificada.
