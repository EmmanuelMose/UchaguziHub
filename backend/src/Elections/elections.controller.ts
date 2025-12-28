import { Request, Response } from "express";
import { electionsService } from "./elections.service";

export const getAllElectionsController = async (_req: Request, res: Response) => {
  try {
    const data = await electionsService.getAll();
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const getElectionByIdController = async (req: Request, res: Response) => {
  try {
    const data = await electionsService.getById(req.params.id);
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const createElectionController = async (req: Request, res: Response) => {
  try {
    const data = await electionsService.create(req.body);
    res.status(201).json({ success: true, data });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const updateElectionController = async (req: Request, res: Response) => {
  try {
    const data = await electionsService.update(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const deleteElectionController = async (req: Request, res: Response) => {
  try {
    const data = await electionsService.delete(req.params.id);
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};
