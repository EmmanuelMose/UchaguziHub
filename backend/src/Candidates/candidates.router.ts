import { Router } from "express";
import { candidatesController } from "./candidates.controller";

const candidatesRouter = Router();

candidatesRouter.get("/", candidatesController.getAll);
candidatesRouter.get("/:id", candidatesController.getById);
candidatesRouter.get("/election/:electionId", candidatesController.getByElection);
candidatesRouter.get("/position/:positionId", candidatesController.getByPosition);
candidatesRouter.post("/", candidatesController.create);
candidatesRouter.put("/:id", candidatesController.update);
candidatesRouter.delete("/:id", candidatesController.delete);

export default candidatesRouter;
