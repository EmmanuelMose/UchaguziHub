import { Request, Response } from "express";
import { usersService, NewUser } from "./users.service";

export const getAllUsersController = async (_req: Request, res: Response) => {
  try {
    const data = await usersService.getAll();
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const data = await usersService.getById(req.params.id);
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const createUserController = async (req: Request, res: Response) => {
  try {
    const data: NewUser = req.body;
    const result = await usersService.create(data);
    res.status(201).json({ success: true, data: result });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const data: Partial<NewUser> = req.body;
    const result = await usersService.update(req.params.id, data);
    res.json({ success: true, data: result });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const result = await usersService.delete(req.params.id);
    res.json({ success: true, data: result });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};
