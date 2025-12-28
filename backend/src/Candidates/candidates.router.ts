import { Router } from "express";
import {
  getAllCandidatesController,
  getCandidateByIdController,
  getCandidatesByElectionController,
  getCandidatesByPositionController,
  createCandidateController,
  updateCandidateController,
  deleteCandidateController
} from "./candidates.controller";

const candidatesRouter = Router();

candidatesRouter.get("/", getAllCandidatesController);
candidatesRouter.get("/:id", getCandidateByIdController);
candidatesRouter.get("/election/:electionId", getCandidatesByElectionController);
candidatesRouter.get("/position/:positionId", getCandidatesByPositionController);
candidatesRouter.post("/", createCandidateController);
candidatesRouter.put("/:id", updateCandidateController);
candidatesRouter.delete("/:id", deleteCandidateController);

export default candidatesRouter;
