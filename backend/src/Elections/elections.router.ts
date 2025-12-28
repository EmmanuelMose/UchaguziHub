import { Router } from "express";
import { electionsController } from "./elections.controller";

const electionsRouter = Router();

electionsRouter.get("/", electionsController.getAll);
electionsRouter.get("/:id", electionsController.getById);
electionsRouter.post("/", electionsController.create);
electionsRouter.put("/:id", electionsController.update);
electionsRouter.delete("/:id", electionsController.delete);

export default electionsRouter;
