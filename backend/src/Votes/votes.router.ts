import { Router } from "express";
import { VotesController } from "../Votes/votes.controller";

const votesRouter = Router();

votesRouter.post("/", VotesController.castVote);
votesRouter.get("/positions/:electionId", VotesController.getPositions);
votesRouter.get("/candidates/:positionId", VotesController.getCandidates);

export default votesRouter;
