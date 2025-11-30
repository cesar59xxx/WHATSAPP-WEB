import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import cors from "cors"
import helmet from "helmet"
import compression from "compression"
import rateLimit from "express-rate-limit"
import dotenv from "dotenv"
import { supabase } from "./config/supabase.js"
import authRoutes from "./routes/auth.routes.js"
import tenantRoutes from "./routes/tenant.routes.js"
import whatsappRoutes from "./routes/whatsapp.routes.js"
import contactRoutes from "./routes/contact.routes.js"
import messageRoutes from "./routes/message.routes.js"
import chatbotRoutes from "./routes/chatbot.routes.js"
import adminRoutes from "./routes/admin.routes.js"
import { setupSocketIO } from "./socket/socket.handler.js"
import { errorHandler } from "./middleware/error.middleware.js"

dotenv.config()

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  },
})

// Middlewares de segurança
app.use(helmet())
app.use(compression())
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
)

// Rate limiting
const limiter = rateLimit({
  windowMs: Number.parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number.parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: "Muitas requisições deste IP, tente novamente mais tarde",
})
app.use("/api/", limiter)

// Body parser
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true, limit: "50mb" }))

// Rotas da API
app.use("/api/auth", authRoutes)
app.use("/api/tenants", tenantRoutes)
app.use("/api/whatsapp", whatsappRoutes)
app.use("/api/contacts", contactRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/chatbots", chatbotRoutes)
app.use("/api/admin", adminRoutes)

// Health check
app.get("/api/health", async (req, res) => {
  try {
    const { data, error } = await supabase.from("tenants").select("count").limit(1).single()

    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: error ? "error" : "connected",
    })
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    })
  }
})

// Setup Socket.IO
setupSocketIO(io)

// Error handler deve ser o último middleware
app.use(errorHandler)

// Iniciar servidor
const PORT = process.env.PORT || 3001
httpServer.listen(PORT, () => {
  console.log(`
🚀 Servidor rodando na porta ${PORT}
📱 WhatsApp CRM SaaS iniciado
🌍 Ambiente: ${process.env.NODE_ENV || "development"}
💾 Database: Supabase
  `)
})

// Tratamento de erros não capturados
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err)
  process.exit(1)
})

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err)
  process.exit(1)
})

export { io, supabase }
