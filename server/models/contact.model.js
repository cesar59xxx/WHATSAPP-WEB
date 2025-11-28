import mongoose from "mongoose"

/**
 * Schema de Contato (CRM)
 */
const contactSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
      index: true,
    },
    whatsappId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    avatar: {
      type: String,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    customFields: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
    },
    pipelineStage: {
      type: String,
      enum: ["new", "contacted", "qualified", "proposal", "negotiation", "won", "lost"],
      default: "new",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    notes: [
      {
        content: String,
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    lastInteraction: {
      type: Date,
    },
    totalMessages: {
      type: Number,
      default: 0,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// Índices compostos para performance
contactSchema.index({ tenantId: 1, whatsappId: 1 }, { unique: true })
contactSchema.index({ tenantId: 1, phoneNumber: 1 })
contactSchema.index({ tenantId: 1, pipelineStage: 1 })
contactSchema.index({ tenantId: 1, tags: 1 })
contactSchema.index({ tenantId: 1, lastInteraction: -1 })

// Busca por texto
contactSchema.index({ name: "text", phoneNumber: "text", email: "text" })

export const Contact = mongoose.model("Contact", contactSchema)
