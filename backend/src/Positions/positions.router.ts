import { Router } from "express";
import {
  getAllPositionsController,
  getPositionByIdController,
  getPositionsByElectionController,
  createPositionController,
  updatePositionController,
  deletePositionController
} from "./positions.controller";

const positionsRouter = Router();

positionsRouter.get("/", getAllPositionsController);
positionsRouter.get("/election/:electionId", getPositionsByElectionController);
positionsRouter.get("/:id", getPositionByIdController);
positionsRouter.post("/", createPositionController);
positionsRouter.put("/:id", updatePositionController);
positionsRouter.delete("/:id", deletePositionController);

export default positionsRouter;