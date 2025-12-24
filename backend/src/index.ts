import express from "express";
import cors from "cors";
import authRouter from "./auth/auth.router"; // ✅ FIXED PATH

const initializeApp = () => {
  const app = express();

  app.use(express.json());

  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );

  app.get("/", (_req, res) => {
    res.send("Hello Express!");
  });

  //  AUTH ROUTES
  app.use("/api/auth", authRouter);

  return app;
};

const app = initializeApp();
export default app;
