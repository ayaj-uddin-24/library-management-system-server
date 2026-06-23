import mongoose from "mongoose";
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

export const connectDB = async (): Promise<void> => {
  try {
    console.log("Attempting to connect to MongoDB...");
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error("❌ MongoDB Connection Error:");
    console.error(error.message);
    if (error.name === "MongoServerSelectionError") {
      console.error("Tip: Check your IP whitelist and credentials");
    }
    process.exit(1);
  }
};

mongoose.connection.on("disconnected", () => {
  logger.warn("MongoDB disconnected");
});
