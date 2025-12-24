import { Request, Response } from "express";
import {
  registerService,
  verifyService,
  loginService
} from "./auth.service";

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    await registerService(email, password);
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyUserController = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;
    await verifyService(email, code);
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await loginService(email, password);
    res.json({ success: true, ...data });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
