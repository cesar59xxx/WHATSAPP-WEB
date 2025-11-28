import dotenv from "dotenv"
import mongoose from "mongoose"
import { messageQueue } from "../queues/message.queue.js"
import { Message } from "../models/message.model.js"
import { Contact } from "../models/contact.model.js"
import { ChatbotFlow } from "../models/chatbot-flow.model.js"
import { whatsappManager } from "../services/whatsapp-manager.service.js"
import { executeChatbotFlow } from "../services/chatbot.service.js"

dotenv.config()

/**
 * Worker para processar filas em segundo plano
 * Execute com: node server/workers/queue-worker.js
 */

// Conectar ao MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("[Worker] MongoDB conectado")
  })
  .catch((err) => {
    console.error("[Worker] Erro ao conectar MongoDB:", err)
    process.exit(1)
  })

/**
 * Processar mensagem recebida
 */
messageQueue.process("process-message", async (job) => {
  const { messageId, tenantId, contactId, sessionId } = job.data

  console.log(`[Worker] Processando mensagem ${messageId}`)

  try {
    // Buscar mensagem e contato
    const message = await Message.findById(messageId)
    const contact = await Contact.findById(contactId)

    if (!message || !contact) {
      throw new Error("Mensagem ou contato não encontrado")
    }

    // Buscar fluxos de chatbot ativos para este tenant
    const activeFlows = await ChatbotFlow.find({
      tenantId,
      isActive: true,
    })

    if (activeFlows.length === 0) {
      console.log("[Worker] Nenhum fluxo de chatbot ativo")
      return
    }

    // Verificar se algum fluxo deve ser acionado
    for (const flow of activeFlows) {
      const shouldTrigger = await checkFlowTrigger(flow, message, contact)

      if (shouldTrigger) {
        console.log(`[Worker] Executando fluxo: ${flow.name}`)

        await executeChatbotFlow(flow, contact, message, sessionId, tenantId)

        break // Executar apenas um fluxo por vez
      }
    }

    console.log(`[Worker] Mensagem ${messageId} processada`)
  } catch (error) {
    console.error(`[Worker] Erro ao processar mensagem:`, error)
    throw error
  }
})

/**
 * Verificar se fluxo deve ser acionado
 */
async function checkFlowTrigger(flow, message, contact) {
  if (!flow.trigger) return false

  const { type, config } = flow.trigger

  switch (type) {
    case "keyword":
      // Verificar se mensagem contém palavra-chave
      const keywords = config.keywords || []
      const messageText = message.content.text?.toLowerCase() || ""

      return keywords.some((keyword) => messageText.includes(keyword.toLowerCase()))

    case "first_message":
      // Verificar se é a primeira mensagem do contato
      return contact.totalMessages === 1

    case "pipeline_stage":
      // Verificar etapa do funil
      return contact.pipelineStage === config.stage

    case "tag":
      // Verificar se contato tem tag específica
      const requiredTags = config.tags || []
      return requiredTags.some((tag) => contact.tags.includes(tag))

    default:
      return false
  }
}

/**
 * Processar envio agendado
 */
messageQueue.process("send-scheduled", async (job) => {
  const { sessionId, contactId, content, type } = job.data

  console.log(`[Worker] Enviando mensagem agendada para contato ${contactId}`)

  try {
    const contact = await Contact.findById(contactId)

    if (!contact) {
      throw new Error("Contato não encontrado")
    }

    await whatsappManager.sendMessage(sessionId, contact.whatsappId, content, type)

    console.log(`[Worker] Mensagem agendada enviada`)
  } catch (error) {
    console.error(`[Worker] Erro ao enviar mensagem agendada:`, error)
    throw error
  }
})

/**
 * Limpar sessões antigas
 */
messageQueue.process("cleanup-sessions", async (job) => {
  console.log("[Worker] Limpando sessões antigas...")

  // Implementar lógica de limpeza
  // Por exemplo: remover sessões desconectadas há mais de 30 dias

  console.log("[Worker] Limpeza concluída")
})

console.log("[Worker] Queue worker iniciado")
console.log("[Worker] Aguardando jobs...")

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("[Worker] Encerrando...")
  await messageQueue.close()
  await mongoose.connection.close()
  process.exit(0)
})
