import mongoose from "mongoose"

/**
 * Schema da Sessão WhatsApp
 * Cada sessão representa uma conexão WhatsApp Web ativa
 */
const whatsappSessionSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
      index: true,
    },
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["disconnected", "connecting", "qr", "authenticated", "ready", "error"],
      default: "disconnected",
    },
    qrCode: {
      type: String,
    },
    qrCodeExpiry: {
      type: Date,
    },
    authStrategy: {
      type: String,
      enum: ["LocalAuth", "RemoteAuth"],
      default: "LocalAuth",
    },
    lastConnected: {
      type: Date,
    },
    lastDisconnected: {
      type: Date,
    },
    reconnectAttempts: {
      type: Number,
      default: 0,
    },
    maxReconnectAttempts: {
      type: Number,
      default: 5,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    metadata: {
      pushname: String,
      platform: String,
      wid: String,
    },
  },
  {
    timestamps: true,
  },
)

// Índices
whatsappSessionSchema.index({ tenantId: 1, status: 1 })
whatsappSessionSchema.index({ sessionId: 1 })

export const WhatsAppSession = mongoose.model("WhatsAppSession", whatsappSessionSchema)
