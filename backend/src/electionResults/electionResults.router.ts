import { Router } from "express";
import { ElectionResultsController } from "../electionResults/electionResults.controller";

const electionRouter = Router();

electionRouter.get("/", ElectionResultsController.getAllElections);
electionRouter.get("/:electionId/positions", ElectionResultsController.getPositions);
electionRouter.get("/:electionId/results", ElectionResultsController.getElectionResults);

export default electionRouter;
