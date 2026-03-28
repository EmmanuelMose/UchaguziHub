import express from "express";
import cors from "cors";
import authRouter from "./auth/auth.router";
import systemUsersRouter from "./SystemUsers/systemUsers.router";
import usersRouter from "./Users/users.router";
import electionsRouter from "./Elections/elections.router";
import positionsRouter from "./Positions/positions.router";
import candidatesRouter from "./Candidates/candidates.router";
import votesRouter from "./Votes/votes.router";
import  {ComplainRouter}  from "./complains/complains.router";
import electionResultsRouter from "./electionResults/electionResults.router";

const initializeApp = () => {
  const app = express();

  app.use(express.json());

  const allowedOrigins = [
    "https://uchaguzi-hub.vercel.app",
    "http://localhost:5173"
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );

  app.get("/", (_req, res) => {
    res.send("Backend server running successfully!");
  });

  app.use("/api/auth", authRouter);
  app.use("/api/system-users", systemUsersRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/elections", electionsRouter);
  app.use("/api/positions", positionsRouter);
  app.use("/api/candidates", candidatesRouter);
  app.use("/api/votes", votesRouter);
  app.use("/complaints", ComplainRouter);
 app.use("/api/election-results", electionResultsRouter);



  return app;
};

const app = initializeApp();
export default app;
