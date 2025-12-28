import { Router } from "express";
import { positionsController } from "./positions.controller";

const positionsRouter = Router();

positionsRouter.get("/", positionsController.getAll);
positionsRouter.get("/:id", positionsController.getById);
positionsRouter.get("/election/:electionId", positionsController.getByElection);
positionsRouter.post("/", positionsController.create);
positionsRouter.put("/:id", positionsController.update);
positionsRouter.delete("/:id", positionsController.delete);

export default positionsRouter;
