import mongoose from "mongoose"
import bcrypt from "bcryptjs"

/**
 * Schema de Usuário (Agentes, Administradores)
 */
const userSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: ["superadmin", "admin", "agent", "viewer"],
      default: "agent",
    },
    permissions: [
      {
        type: String,
        enum: [
          "manage_users",
          "manage_contacts",
          "manage_whatsapp",
          "manage_chatbots",
          "view_analytics",
          "export_data",
          "manage_settings",
        ],
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
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

// Índice composto para email único por tenant
userSchema.index({ tenantId: 1, email: 1 }, { unique: true })

// Hash da senha antes de salvar
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Método para comparar senha
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

// Remover senha do JSON
userSchema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.password
  return obj
}

export const User = mongoose.model("User", userSchema)
