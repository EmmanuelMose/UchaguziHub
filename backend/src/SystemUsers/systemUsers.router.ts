import { Router } from "express";
import {
  getAllSystemUsersController,
  getSystemUserByIdController,
  createSystemUserController,
  updateSystemUserController,
  deleteSystemUserController
} from "./systemUsers.controller";

const systemUsersRouter = Router();

systemUsersRouter.get("/", getAllSystemUsersController);
systemUsersRouter.get("/:id", getSystemUserByIdController);
systemUsersRouter.post("/", createSystemUserController);
systemUsersRouter.put("/:id", updateSystemUserController);
systemUsersRouter.delete("/:id", deleteSystemUserController);

export default systemUsersRouter;
