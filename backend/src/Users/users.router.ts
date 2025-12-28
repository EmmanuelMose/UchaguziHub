import { Router } from "express";
import { usersController } from "./users.controller";

const usersRouter = Router();

usersRouter.get("/", usersController.getAll);
usersRouter.get("/:id", usersController.getById);
usersRouter.post("/", usersController.create);
usersRouter.put("/:id", usersController.update);
usersRouter.delete("/:id", usersController.delete);

export default usersRouter;
