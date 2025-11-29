# 🎯 COMO TESTAR O SISTEMA AGORA

## ✅ Status: PRONTO PARA TESTAR!

O banco de dados Supabase foi configurado com sucesso com todas as tabelas, políticas RLS e triggers.

## 🚀 Passo a Passo Rápido

### 1️⃣ Abrir o Preview
Clique no botão **"Open Preview"** no canto superior direito desta janela.

### 2️⃣ Criar Sua Conta
Na página inicial, clique em **"Sign Up"** e preencha:
- **Nome**: Seu nome completo
- **Empresa**: Nome da sua empresa/projeto
- **Email**: seu@email.com
- **Senha**: mínimo 6 caracteres

### 3️⃣ Confirmar Email
⚠️ **IMPORTANTE**: Você vai receber um email do Supabase:
- Abra sua caixa de entrada
- Procure por email de `noreply@mail.app.supabase.io`
- Clique no link de confirmação
- Volte para o app

### 4️⃣ Fazer Login
Após confirmar o email:
- Volte para o app
- Clique em **"Login"**
- Entre com seu email e senha
- Você será redirecionado para o Dashboard

## 🎨 O Que Você Vai Ver

### Dashboard Principal
- **Total de Contatos**: 0 (novo)
- **Mensagens Hoje**: 0 (novo)
- **Sessões Ativas**: 0 (novo)
- **Taxa de Resposta**: 95% (mock)
- **Conversas Recentes**: Vazio (aguardando dados)
- **Primeiros Passos**: Checklist para começar

### Menu Lateral
Explore todas as funcionalidades:

1. **📊 Dashboard** - Visão geral com estatísticas
2. **💬 Inbox** - Sistema de chat (mock com dados exemplo)
3. **📱 WhatsApp** - Gerenciar sessões (mock)
4. **👥 Contatos** - CRM completo com tabela
5. **🔄 Pipeline** - Funil de vendas Kanban
6. **🤖 Chatbots** - Editor de fluxos de automação
7. **⚙️ Settings** - Configurações da conta

### Tema Escuro
- Clique no ícone de lua/sol no header
- Alterna entre tema claro e escuro
- Salva preferência automaticamente

## 🧪 Testar Funcionalidades

### Criar Contato
1. Vá em **"Contatos"**
2. Clique em **"Novo Contato"**
3. Preencha:
   - WhatsApp: +5511999999999
   - Nome: Cliente Teste
   - Email: cliente@teste.com
   - Tags: VIP, Interessado
4. Salvar

### Ver Pipeline
1. Vá em **"Pipeline"**
2. Veja os estágios do funil:
   - Novo
   - Contactado
   - Qualificado
   - Proposta
   - Negociação
   - Ganho / Perdido
3. Arraste cards entre colunas (quando tiver contatos)

### Criar Chatbot
1. Vá em **"Chatbots"**
2. Clique em **"Novo Flow"**
3. Configure:
   - Nome: Boas-vindas
   - Trigger: keyword
   - Palavra-chave: oi
4. Adicione nós no editor visual

## 💾 Dados de Teste

O sistema está vazio inicialmente. Dados aparecem conforme você:
- Cria contatos
- Conecta sessões WhatsApp (mock)
- Cria fluxos de chatbot
- Usa o sistema

### Dados Reais
Para ter dados reais do WhatsApp, você precisará:
1. Deploy do backend Node.js separado
2. Configuração do whatsapp-web.js
3. Servidor com Puppeteer rodando

## ✨ Funcionalidades Testáveis

### ✅ Funcionando Agora
- Autenticação completa
- Sistema multi-tenant (dados isolados por empresa)
- Dashboard com estatísticas
- CRM com CRUD de contatos
- Pipeline Kanban visual
- Interface de chatbot
- Tema claro/escuro
- Responsivo mobile

### 🚧 Mock (Simulado)
- Inbox de mensagens (dados estáticos)
- Sessões WhatsApp (sem conexão real)
- Envio de mensagens (sem WhatsApp real)

### ⚠️ Requer Backend Separado
- Conexão WhatsApp real
- QR Code para autenticar
- Recebimento de mensagens reais
- Envio de mensagens reais
- WebSocket em tempo real

## 🎉 Pronto!

Agora você pode:
1. ✅ Criar conta e fazer login
2. ✅ Explorar todas as páginas
3. ✅ Criar contatos no CRM
4. ✅ Visualizar o pipeline
5. ✅ Testar o editor de chatbot
6. ✅ Mudar tema claro/escuro
7. ✅ Ver estatísticas no dashboard

## 🚀 Próximo Passo: Deploy

Quando estiver satisfeito, clique em **"Publish"** para fazer deploy na Vercel e ter seu próprio link público!

---

**Divirta-se testando! 🎊**
