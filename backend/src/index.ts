import express from "express";
import cors from "cors";
import authRouter from "../../backend/src/auth/auth.router";

const initializeApp = () => {
  const app = express();

  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );

  app.get("/", (_req, res) => {
    res.send("Hello Express!");
  });

  app.use("/api/auth", authRouter);

  return app;
};

const app = initializeApp();
export default app;
