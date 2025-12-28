import { Router } from "express";
import {
  getAllUsersController,
  getUserByIdController,
  createUserController,
  updateUserController,
  deleteUserController
} from "./users.controller";

const usersRouter = Router();

usersRouter.get("/", getAllUsersController);
usersRouter.get("/:id", getUserByIdController);
usersRouter.post("/", createUserController);
usersRouter.put("/:id", updateUserController);
usersRouter.delete("/:id", deleteUserController);

export default usersRouter;
