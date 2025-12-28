import { Router } from "express";
import { votesController } from "./votes.controller";

const votesRouter = Router();

votesRouter.get("/", votesController.getAll);
votesRouter.get("/:id", votesController.getById);
votesRouter.post("/", votesController.create);
votesRouter.delete("/:id", votesController.delete);

export default votesRouter;
