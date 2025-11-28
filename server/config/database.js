import mongoose from "mongoose"

/**
 * Configuração do MongoDB com opções otimizadas
 */
export const connectDB = async () => {
  try {
    const options = {
      maxPoolSize: 10,
      minPoolSize: 5,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 5000,
      family: 4,
    }

    await mongoose.connect(process.env.MONGODB_URI, options)

    mongoose.connection.on("connected", () => {
      console.log("✅ Mongoose conectado ao MongoDB")
    })

    mongoose.connection.on("error", (err) => {
      console.error("❌ Erro de conexão Mongoose:", err)
    })

    mongoose.connection.on("disconnected", () => {
      console.log("⚠️ Mongoose desconectado")
    })

    // Graceful shutdown
    process.on("SIGINT", async () => {
      await mongoose.connection.close()
      console.log("🛑 Mongoose desconectado devido ao término da aplicação")
      process.exit(0)
    })
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB:", error)
    process.exit(1)
  }
}
