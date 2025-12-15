import express from "express";
import cors from "cors";

const initializeApp = () => {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );

  // Test route
  app.get("/", (_req, res) => {
    res.send("Hello Express!");
  });

  return app;
};

const app = initializeApp();
export default app;
