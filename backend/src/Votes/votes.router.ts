import { Router } from "express";
import {
  getAllVotesController,
  getVoteByIdController,
  createVoteController,
  deleteVoteController
} from "../Votes/votes.contoller";

const votesRouter = Router();

votesRouter.get("/", getAllVotesController);
votesRouter.get("/:id", getVoteByIdController);
votesRouter.post("/", createVoteController);
votesRouter.delete("/:id", deleteVoteController);

export default votesRouter;
