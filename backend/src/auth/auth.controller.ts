import { Request, Response } from "express";
import {
  registerService,
  verifyService,
  loginService,
  forgotPasswordService,
  verifyResetCodeService,
  resetPasswordService
} from "./auth.service";

// -------------------- Register --------------------
export const registerUserController = async (req: Request, res: Response) => {
  try {
    const { fullName, email, registrationNumber, password } = req.body;
    await registerService(fullName, email, registrationNumber, password);
    res.json({ success: true });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

// -------------------- Verify --------------------
export const verifyUserController = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;
    await verifyService(email, code);
    res.json({ success: true });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

// -------------------- Login --------------------
export const loginUserController = async (req: Request, res: Response) => {
  console.log("Login attempt:", req.body);
  try {
    const { email, password } = req.body;
    const data = await loginService(email, password);
    console.log("Login success:", data);
    res.json({ success: true, ...data });
  } catch (e: any) {
    console.error("Login error:", e.message);
    res.status(400).json({ success: false, message: e.message });
  }
};

// -------------------- Forgot Password --------------------
export const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    await forgotPasswordService(req.body.email);
    res.json({ success: true });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

// -------------------- Verify Reset Code --------------------
export const verifyResetCodeController = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;
    await verifyResetCodeService(email, code);
    res.json({ success: true });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

// -------------------- Reset Password --------------------
export const resetPasswordController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    await resetPasswordService(email, password);
    res.json({ success: true, message: "Password reset successfully" });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};
