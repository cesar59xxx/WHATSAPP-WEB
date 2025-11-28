import mongoose from "mongoose"

/**
 * Schema de Fluxo de Chatbot
 * Define automações e respostas automáticas
 */
const chatbotFlowSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    trigger: {
      type: {
        type: String,
        enum: ["keyword", "first_message", "pipeline_stage", "tag", "business_hours", "manual"],
        required: true,
      },
      config: {
        keywords: [String],
        stage: String,
        tags: [String],
        timeRange: {
          start: String,
          end: String,
        },
      },
    },
    nodes: [
      {
        id: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ["message", "question", "condition", "action", "delay", "end"],
          required: true,
        },
        position: {
          x: Number,
          y: Number,
        },
        data: {
          // Para type: message
          content: {
            type: String,
          },
          mediaUrl: String,

          // Para type: question
          question: String,
          options: [
            {
              label: String,
              value: String,
              nextNodeId: String,
            },
          ],

          // Para type: condition
          conditions: [
            {
              field: String,
              operator: String,
              value: mongoose.Schema.Types.Mixed,
              nextNodeId: String,
            },
          ],

          // Para type: action
          action: String,
          params: mongoose.Schema.Types.Mixed,

          // Para type: delay
          delayMs: Number,
        },
        nextNodeId: String,
      },
    ],
    edges: [
      {
        id: String,
        source: String,
        target: String,
        label: String,
      },
    ],
    variables: [
      {
        name: String,
        type: {
          type: String,
          enum: ["text", "number", "date", "boolean"],
        },
        defaultValue: mongoose.Schema.Types.Mixed,
      },
    ],
    isActive: {
      type: Boolean,
      default: false,
    },
    stats: {
      totalExecutions: { type: Number, default: 0 },
      totalCompletions: { type: Number, default: 0 },
      averageCompletionTime: { type: Number, default: 0 },
      lastExecutedAt: Date,
    },
  },
  {
    timestamps: true,
  },
)

// Índices
chatbotFlowSchema.index({ tenantId: 1, isActive: 1 })

export const ChatbotFlow = mongoose.model("ChatbotFlow", chatbotFlowSchema)
