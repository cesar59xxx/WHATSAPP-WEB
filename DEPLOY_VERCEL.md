# 🚀 Deploy na Vercel - Guia Completo

## ✅ Pré-requisitos Concluídos

- [x] Supabase conectado e configurado
- [x] Banco de dados criado com todas as tabelas
- [x] RLS (Row Level Security) habilitado
- [x] Triggers automáticos configurados

## 📦 Banco de Dados Criado

Tabelas criadas com sucesso:
- `tenants` - Clientes do SaaS (multi-tenant)
- `users` - Usuários/agentes do sistema
- `contacts` - Contatos do CRM
- `messages` - Histórico de mensagens
- `whatsapp_sessions` - Sessões WhatsApp
- `chatbot_flows` - Fluxos de automação
- `chatbot_logs` - Logs do chatbot

## 🎯 Como Testar Agora

### 1. Visualizar o Projeto
Clique no botão **"Open Preview"** no canto superior direito do v0 para ver o projeto rodando!

### 2. Criar Sua Conta
1. Acesse a página inicial
2. Clique em **"Sign Up"**
3. Preencha:
   - **Full Name**: Seu nome
   - **Company Name**: Nome da sua empresa
   - **Email**: Seu email
   - **Password**: Senha forte
4. Clique em **"Create Account"**

### 3. Confirmar Email
⚠️ **IMPORTANTE**: Você receberá um email de confirmação do Supabase. Clique no link para ativar sua conta.

### 4. Fazer Login
Após confirmar o email, faça login com suas credenciais.

### 5. Explorar o Dashboard
Você terá acesso a:
- 📊 **Dashboard**: Estatísticas em tempo real
- 💬 **Inbox**: Sistema de chat (funciona com dados mockados)
- 📱 **WhatsApp**: Gerenciar sessões WhatsApp (mock)
- 👥 **Contatos**: CRM completo
- 🔄 **Pipeline**: Funil de vendas Kanban
- 🤖 **Chatbots**: Editor visual de fluxos
- ⚙️ **Settings**: Configurações da conta

## 🚀 Deploy para Produção

### Opção 1: Deploy Direto (Recomendado)
1. Clique em **"Publish"** no canto superior direito
2. Escolha um nome para o projeto
3. Pronto! Seu SaaS está no ar em `seu-projeto.vercel.app`

### Opção 2: Deploy via GitHub
1. Clique em **"Connect to GitHub"** na sidebar
2. Faça commit do código
3. Acesse [vercel.com/new](https://vercel.com/new)
4. Importe seu repositório
5. As variáveis de ambiente já estão configuradas automaticamente

## 🔧 Variáveis de Ambiente

Já configuradas automaticamente:
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=xxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
\`\`\`

## ⚡ Funcionalidades Prontas

### ✅ Funcionando Agora
- Autenticação completa (Supabase Auth)
- Sistema multi-tenant (isolamento de dados)
- Dashboard com estatísticas
- CRM com contatos
- Pipeline Kanban
- Interface visual profissional
- Tema claro/escuro
- Responsivo mobile

### 🔨 Para Adicionar Depois
- Integração real com WhatsApp Web (whatsapp-web.js)
- WebSocket para mensagens em tempo real
- Sistema de billing/pagamentos
- Notificações push
- Exportação de relatórios

## 📱 Próximos Passos

### Para Conectar WhatsApp Real
O whatsapp-web.js não funciona no navegador. Você precisará:

1. **Criar um servidor Node.js separado** para rodar o whatsapp-web.js
2. **Deploy do backend** na sua infraestrutura (VPS, Railway, etc)
3. **Conectar via API** o frontend Next.js com o backend Express

Arquivos do backend já estão na pasta `/server/` prontos para uso!

### Arquitetura Recomendada
\`\`\`
Frontend (Vercel)          Backend (VPS/Railway)
    ↓                              ↓
  Next.js  ←--- API REST --->  Express.js
  Supabase                    whatsapp-web.js
                              Puppeteer
\`\`\`

## 🎨 Customização

### Alterar Cores do Tema
Edite `app/globals.css` nas variáveis CSS:
\`\`\`css
--primary: ...
--background: ...
--foreground: ...
\`\`\`

### Adicionar Logo
Coloque sua logo em `public/logo.png` e atualize em `app/page.tsx`

## 🆘 Suporte

Problemas? Verifique:
- Email de confirmação do Supabase foi clicado?
- Variáveis de ambiente estão corretas?
- Browser tem JavaScript habilitado?

## 🎉 Pronto!

Seu SaaS CRM + Chatbot está configurado e pronto para uso!
Comece criando sua conta e explorando todas as funcionalidades.
