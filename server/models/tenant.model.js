import mongoose from "mongoose"

/**
 * Schema do Tenant (Cliente do SaaS)
 * Cada tenant representa uma empresa/cliente usando a plataforma
 */
const tenantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    domain: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    plan: {
      type: String,
      enum: ["free", "basic", "pro", "enterprise"],
      default: "free",
    },
    planLimits: {
      maxAgents: { type: Number, default: 1 },
      maxWhatsAppSessions: { type: Number, default: 1 },
      maxContacts: { type: Number, default: 100 },
      maxMessagesPerMonth: { type: Number, default: 1000 },
      maxChatbots: { type: Number, default: 1 },
    },
    subscription: {
      status: {
        type: String,
        enum: ["active", "inactive", "trial", "cancelled", "suspended"],
        default: "trial",
      },
      stripeCustomerId: String,
      stripeSubscriptionId: String,
      currentPeriodStart: Date,
      currentPeriodEnd: Date,
      trialEndsAt: {
        type: Date,
        default: () => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 dias
      },
    },
    settings: {
      timezone: { type: String, default: "America/Sao_Paulo" },
      language: { type: String, default: "pt-BR" },
      businessHours: {
        enabled: { type: Boolean, default: false },
        schedule: [
          {
            dayOfWeek: { type: Number, min: 0, max: 6 },
            startTime: String,
            endTime: String,
          },
        ],
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    metadata: {
      type: Map,
      of: String,
    },
  },
  {
    timestamps: true,
  },
)

// Índices para performance
tenantSchema.index({ email: 1 })
tenantSchema.index({ domain: 1 })
tenantSchema.index({ "subscription.status": 1 })

// Verificar se está dentro dos limites do plano
tenantSchema.methods.canAddAgent = async function () {
  const User = mongoose.model("User")
  const agentCount = await User.countDocuments({ tenantId: this._id, role: "agent" })
  return agentCount < this.planLimits.maxAgents
}

tenantSchema.methods.canAddWhatsAppSession = async function () {
  const WhatsAppSession = mongoose.model("WhatsAppSession")
  const sessionCount = await WhatsAppSession.countDocuments({ tenantId: this._id })
  return sessionCount < this.planLimits.maxWhatsAppSessions
}

export const Tenant = mongoose.model("Tenant", tenantSchema)
