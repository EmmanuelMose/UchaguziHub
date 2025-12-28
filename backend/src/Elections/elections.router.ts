import { Router } from "express";
import {
  getAllElectionsController,
  getElectionByIdController,
  createElectionController,
  updateElectionController,
  deleteElectionController
} from "./elections.controller";

const electionsRouter = Router();

electionsRouter.get("/", getAllElectionsController);
electionsRouter.get("/:id", getElectionByIdController);
electionsRouter.post("/", createElectionController);
electionsRouter.put("/:id", updateElectionController);
electionsRouter.delete("/:id", deleteElectionController);

export default electionsRouter;
