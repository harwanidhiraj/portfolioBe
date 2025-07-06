import express, { Request, Response } from "express";
import config from "./config";
import adminRoutes from "./routes/adminRoutes";
import userRoutes from "./routes/userRoutes";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { errorHandler } from "./middlewares/errorMiddleware";

const app = express();
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ limit: "100kb", extended: true }));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(morgan("common"));
app.use(cookieParser());
app.use(helmet());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  })
);

app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req: Request, res: Response) => {
  const protocol = req.protocol.toUpperCase();
  res.send(
    `Hello from ${protocol} server! Running in ${config.env} mode on port ${config.port} and url is ${config.dbUrl}`
  );
});

app.use(errorHandler);

export default app;
