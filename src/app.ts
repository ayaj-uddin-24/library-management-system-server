import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

// Security & Basic Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api", limiter);

// API Routes
app.use("/api/auth", authRoutes);

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Error Handler (must be last)
app.use(errorHandler);

export default app;
