# 📱 Guia de Uso - WhatsApp CRM SaaS

## Sumário
1. [Visão Geral](#visão-geral)
2. [Primeiro Acesso](#primeiro-acesso)
3. [Conectando WhatsApp](#conectando-whatsapp)
4. [Gerenciando Contatos](#gerenciando-contatos)
5. [Inbox e Conversas](#inbox-e-conversas)
6. [Pipeline de Vendas](#pipeline-de-vendas)
7. [Criando Chatbots](#criando-chatbots)
8. [Configurações](#configurações)

---

## Visão Geral

O WhatsApp CRM SaaS é uma plataforma completa para gestão profissional do WhatsApp Business, combinando:

- **CRM Completo**: Gerencie contatos, leads e pipeline de vendas
- **Inbox Unificado**: Todas as conversas em tempo real em um só lugar
- **Chatbot Inteligente**: Automações com editor visual drag-and-drop
- **Multi-sessão**: Conecte múltiplos números WhatsApp simultaneamente
- **Analytics**: Dashboards e relatórios completos

---

## Primeiro Acesso

### 1. Criar Conta

Acesse a landing page e clique em **"Começar Grátis"** ou **"Criar Conta"**.

**Preencha:**
- Nome da empresa
- Email
- Senha (mínimo 6 caracteres)
- Nome completo
- Plano desejado (Free, Starter, Business, Enterprise)

### 2. Login

Após o registro, você será redirecionado automaticamente para o Dashboard. Nas próximas vezes, acesse via `/login`.

**Dados de Login:**
- Email cadastrado
- Senha

---

## Conectando WhatsApp

### Passo 1: Acessar Sessões WhatsApp

No menu lateral, clique em **"WhatsApp"**.

### Passo 2: Criar Nova Sessão

1. Clique no botão **"+ Nova Sessão"**
2. Dê um nome identificador (ex: "Atendimento Principal")
3. Clique em **"Criar Sessão"**

### Passo 3: Conectar via QR Code

1. Clique em **"Conectar"** na sessão criada
2. Um QR Code será exibido
3. No seu celular:
   - Abra o **WhatsApp**
   - Toque nos **3 pontos** (Android) ou **Configurações** (iOS)
   - Selecione **"Aparelhos conectados"**
   - Toque em **"Conectar aparelho"**
   - Escaneie o QR Code

### Status da Conexão

- 🟢 **Conectado**: WhatsApp pronto para uso
- 🟡 **Aguardando QR**: Escaneie o código
- 🔵 **Autenticando**: Processando conexão
- ⚪ **Desconectado**: Inativo
- 🔴 **Erro**: Reconectar necessário

### Múltiplas Sessões

Você pode conectar vários números WhatsApp ao mesmo tempo, respeitando o limite do seu plano:

- **Free**: 1 sessão
- **Starter**: 3 sessões
- **Business**: 10 sessões
- **Enterprise**: Ilimitado

---

## Gerenciando Contatos

### Acessar CRM

No menu lateral, clique em **"Contatos"**.

### Adicionar Contato Manual

1. Clique em **"+ Novo Contato"**
2. Preencha:
   - Nome
   - Número de telefone (com código do país)
   - Email (opcional)
   - Empresa (opcional)
   - Tags
   - Etapa do funil
   - Observações

### Importar Contatos (CSV)

1. Clique em **"Importar CSV"**
2. Faça upload do arquivo (formato: nome, telefone, email, tags)
3. Mapeie as colunas
4. Confirme a importação

### Organizar Contatos

**Tags:**
- Use tags para categorizar (ex: "VIP", "Interesse Alto", "Follow-up")
- Clique na tag para filtrar contatos

**Filtros Avançados:**
- Por etapa do funil
- Por data de interação
- Por tags
- Por origem

**Busca:**
- Digite nome, telefone ou email na barra de busca
- Resultados aparecem em tempo real

---

## Inbox e Conversas

### Acessar Inbox

No menu lateral, clique em **"Inbox"**.

### Interface do Inbox

**Lado Esquerdo: Lista de Conversas**
- Contatos ordenados por última interação
- Badge de mensagens não lidas
- Busca rápida de contatos

**Lado Direito: Área de Chat**
- Histórico completo de mensagens
- Indicador de visualização
- Status de entrega

### Enviar Mensagens

1. Selecione o contato na lista
2. Digite a mensagem no campo inferior
3. Clique no ícone **Enviar** ou pressione **Enter**

**Atalhos:**
- `Enter`: Enviar mensagem
- `Shift + Enter`: Nova linha

### Anexar Mídia

1. Clique no ícone 📎 (Anexar)
2. Selecione:
   - Imagens (.jpg, .png, .gif)
   - Vídeos (.mp4)
   - Documentos (.pdf, .doc, .xls)
   - Áudios (.mp3, .ogg)

### Ações Rápidas

- 📞 **Ligar**: Iniciar chamada (futuro)
- 🎥 **Vídeo**: Videochamada (futuro)
- 🗄️ **Arquivar**: Arquivar conversa
- ⋮ **Mais**: Menu de opções

### Mensagens em Tempo Real

O sistema usa WebSocket para atualizações instantâneas:
- Novas mensagens aparecem automaticamente
- Status de leitura atualizado em tempo real
- Notificações de digitação (futuro)

---

## Pipeline de Vendas

### Acessar Pipeline

No menu lateral, clique em **"Pipeline"**.

### Estrutura do Funil

O pipeline usa formato **Kanban** com etapas personalizáveis:

**Etapas Padrão:**
1. 🎯 **Lead**: Primeiro contato
2. 🤝 **Qualificado**: Interesse confirmado
3. 💬 **Negociação**: Em processo de venda
4. ✅ **Ganho**: Venda fechada
5. ❌ **Perdido**: Não converteu

### Mover Contatos

**Arrastar e Soltar:**
- Clique e arraste o card do contato
- Solte na etapa desejada
- A mudança é salva automaticamente

**Menu do Card:**
- Clique nos **3 pontos** do card
- Selecione **"Mover para..."**
- Escolha a etapa

### Personalizar Etapas

1. Clique em **"Configurar Pipeline"**
2. Adicione, edite ou remova etapas
3. Defina cores para cada etapa
4. Salve as alterações

### Filtrar Pipeline

- Por tags
- Por período de criação
- Por responsável (agente)
- Por valor estimado

### Estatísticas do Pipeline

**Métricas Exibidas:**
- Taxa de conversão por etapa
- Tempo médio em cada etapa
- Valor total do pipeline
- Leads por etapa

---

## Criando Chatbots

### Acessar Chatbots

No menu lateral, clique em **"Chatbots"**.

### Criar Novo Fluxo

1. Clique em **"+ Novo Chatbot"**
2. Dê um nome (ex: "Boas-vindas")
3. Defina um gatilho (keyword, horário, etc.)

### Editor Visual Drag-and-Drop

**Elementos Disponíveis:**

1. **Mensagem de Texto**
   - Envie texto simples
   - Use variáveis: `{nome}`, `{telefone}`

2. **Pergunta**
   - Capture resposta do usuário
   - Salve em variável

3. **Condicional (If/Else)**
   - Compare valores
   - Crie fluxos diferentes

4. **Ação**
   - Adicionar tag
   - Mudar etapa do funil
   - Notificar agente
   - Criar tarefa

5. **Delay**
   - Aguardar X segundos/minutos
   - Simula digitação humana

6. **Transferir para Agente**
   - Encerrar bot
   - Notificar equipe

### Gatilhos de Ativação

**Palavra-chave:**
- Contato envia palavra específica
- Ex: "Oi", "Olá", "Preço"

**Horário:**
- Ativar fora do horário comercial
- Ex: 18h às 9h

**Etapa do Funil:**
- Quando contato entra em etapa
- Ex: Lead → Qualificado

**Primeira Mensagem:**
- Novo contato envia primeira mensagem

### Testar Chatbot

1. No editor, clique em **"Testar"**
2. Simule conversas
3. Valide o fluxo
4. Ajuste conforme necessário

### Ativar/Desativar

Use o switch no card do chatbot para ativar ou desativar temporariamente.

### Analytics do Chatbot

**Métricas:**
- Mensagens enviadas
- Taxa de conclusão
- Transferências para agente
- Tempo médio de interação

---

## Configurações

### Acessar Configurações

No menu lateral, clique em **"Configurações"**.

### Abas Disponíveis

#### 1. Perfil da Empresa
- Nome da empresa
- Logo
- Dados de contato
- Horário de funcionamento

#### 2. Usuários e Permissões
- Adicionar agentes
- Definir roles (Admin, Agente, Visualizador)
- Gerenciar acessos

#### 3. Integrações
- Webhooks
- API Keys
- Conectar CRMs externos
- Zapier, Make, etc.

#### 4. Plano e Faturamento
- Visualizar plano atual
- Limites de uso
- Histórico de faturas
- Fazer upgrade

#### 5. Segurança
- Autenticação de 2 fatores
- Logs de acesso
- Sessões ativas
- Backup de dados

---

## Atalhos de Teclado

| Ação | Atalho |
|------|--------|
| Abrir busca | `Ctrl + K` |
| Nova conversa | `Ctrl + N` |
| Próxima conversa | `↓` |
| Conversa anterior | `↑` |
| Enviar mensagem | `Enter` |
| Nova linha | `Shift + Enter` |
| Focar no inbox | `Ctrl + I` |
| Focar em contatos | `Ctrl + C` |

---

## Suporte

**Problemas comuns e soluções:**

### WhatsApp não conecta
- Verifique conexão com internet
- Certifique-se que o celular tem internet
- Tente recriar a sessão

### Mensagens não chegam
- Verifique se a sessão está conectada (status verde)
- Confirme que o número do contato está correto (com código do país)
- Aguarde alguns segundos para sincronização

### QR Code não aparece
- Aguarde 2-3 segundos após clicar em "Conectar"
- Recarregue a página
- Tente novamente

### Contato não recebe mensagem
- Número deve estar no formato: +5511999999999
- Certifique-se que o contato não bloqueou o número
- Verifique limites do plano

---

## Melhores Práticas

### Organizaão de Contatos
✅ Use tags consistentes
✅ Atualize etapas do funil regularmente
✅ Adicione observações importantes
✅ Faça backup mensal (exportar CSV)

### Atendimento
✅ Responda em até 15 minutos
✅ Use templates para respostas comuns
✅ Personalize mensagens com o nome do contato
✅ Marque conversas como resolvidas

### Chatbots
✅ Mantenha fluxos simples e diretos
✅ Sempre ofereça opção de falar com humano
✅ Teste antes de ativar
✅ Monitore métricas semanalmente

### Segurança
✅ Use senhas fortes
✅ Ative 2FA
✅ Não compartilhe credenciais
✅ Revise acessos mensalmente

---

## FAQ

**P: Quantos números posso conectar?**
R: Depende do seu plano. Free: 1, Starter: 3, Business: 10, Enterprise: Ilimitado.

**P: As mensagens ficam salvas?**
R: Sim, todo o histórico é armazenado de forma segura e pode ser exportado.

**P: Posso usar no celular?**
R: Sim, a interface é totalmente responsiva e funciona em smartphones e tablets.

**P: É permitido pela Meta/WhatsApp?**
R: Sim, usamos o whatsapp-web.js que simula o WhatsApp Web oficial.

**P: Posso fazer backup dos dados?**
R: Sim, você pode exportar contatos, mensagens e relatórios em CSV/JSON.

**P: Tem limite de mensagens?**
R: Depende do plano. Cada plano tem um limite mensal de mensagens enviadas.

---

## Contato de Suporte

- 📧 Email: suporte@whatsappcrm.com
- 💬 Chat ao vivo: Canto inferior direito
- 📱 WhatsApp: +55 11 99999-9999
- 🎫 Ticket: Área de ajuda no sistema

**Horário de atendimento:**
Segunda a Sexta: 9h às 18h (BRT)
