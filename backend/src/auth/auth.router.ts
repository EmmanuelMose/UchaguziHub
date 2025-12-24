import { Router } from "express";
import {
  registerUserController,
  verifyUserController,
  loginUserController
} from "../auth/auth.controller";

const authRouter = Router();

authRouter.post("/register", registerUserController);
authRouter.post("/verify", verifyUserController);
authRouter.post("/login", loginUserController);

export default authRouter;
