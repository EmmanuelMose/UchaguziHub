import { Request, Response } from "express";
import { systemUsersService } from "./systemUsers.service";

export const getAllSystemUsersController = async (_req: Request, res: Response) => {
  try {
    const data = await systemUsersService.getAll();
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const getSystemUserByIdController = async (req: Request, res: Response) => {
  try {
    const data = await systemUsersService.getById(req.params.id);
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const createSystemUserController = async (req: Request, res: Response) => {
  try {
    const data = await systemUsersService.create(req.body);
    res.status(201).json({ success: true, data });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const updateSystemUserController = async (req: Request, res: Response) => {
  try {
    const data = await systemUsersService.update(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const deleteSystemUserController = async (req: Request, res: Response) => {
  try {
    const data = await systemUsersService.delete(req.params.id);
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};
