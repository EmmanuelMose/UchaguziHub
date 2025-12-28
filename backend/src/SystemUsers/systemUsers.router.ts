import { Router } from "express";
import { systemUsersController } from "./systemUsers.controller";

const systemUsersRouter = Router();

systemUsersRouter.get("/", systemUsersController.getAll);
systemUsersRouter.get("/:id", systemUsersController.getById);
systemUsersRouter.post("/", systemUsersController.create);
systemUsersRouter.put("/:id", systemUsersController.update);
systemUsersRouter.delete("/:id", systemUsersController.delete);

export default systemUsersRouter;
