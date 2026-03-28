import { Router } from "express";
import { ComplainController } from "./complains.controller";

export const ComplainRouter = Router();

ComplainRouter.post("/", ComplainController.create);
ComplainRouter.get("/", ComplainController.getAll);
ComplainRouter.get("/user/:userId", ComplainController.getByUser);
ComplainRouter.delete("/:id", ComplainController.delete);
