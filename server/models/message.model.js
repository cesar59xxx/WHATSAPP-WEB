import mongoose from "mongoose"

/**
 * Schema de Mensagem
 */
const messageSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
      index: true,
    },
    contactId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
      index: true,
    },
    sessionId: {
      type: String,
      required: true,
    },
    whatsappMessageId: {
      type: String,
      required: true,
      unique: true,
    },
    direction: {
      type: String,
      enum: ["inbound", "outbound"],
      required: true,
    },
    type: {
      type: String,
      enum: ["text", "image", "video", "audio", "document", "sticker", "location", "contact"],
      default: "text",
    },
    content: {
      text: String,
      mediaUrl: String,
      mimeType: String,
      caption: String,
      filename: String,
      location: {
        latitude: Number,
        longitude: Number,
        description: String,
      },
    },
    status: {
      type: String,
      enum: ["pending", "sent", "delivered", "read", "failed"],
      default: "pending",
    },
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isFromBot: {
      type: Boolean,
      default: false,
    },
    botFlowId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatbotFlow",
    },
    quotedMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  },
)

// Índices para performance
messageSchema.index({ tenantId: 1, contactId: 1, timestamp: -1 })
messageSchema.index({ tenantId: 1, sessionId: 1, timestamp: -1 })
messageSchema.index({ whatsappMessageId: 1 })

export const Message = mongoose.model("Message", messageSchema)
