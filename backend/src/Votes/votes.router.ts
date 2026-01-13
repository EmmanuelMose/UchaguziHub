import { Router } from "express";
import {
  getAllVotesController,
  getVoteByIdController,
  createVoteController,
  deleteVoteController,
  checkIfVotedController
} from "./votes.controller";

const votesRouter = Router();

votesRouter.get("/", getAllVotesController);
votesRouter.get("/:id", getVoteByIdController);
votesRouter.post("/", createVoteController);
votesRouter.delete("/:id", deleteVoteController);

// New endpoint for checking if user already voted
votesRouter.get("/check", checkIfVotedController);

export default votesRouter;
