import { Request, Response } from "express";
import { positionsService } from "./positions.service";

export const getAllPositionsController = async (_req: Request, res: Response) => {
  try {
    const data = await positionsService.getAll();
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const getPositionByIdController = async (req: Request, res: Response) => {
  try {
    const data = await positionsService.getById(req.params.id);
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const getPositionsByElectionController = async (req: Request, res: Response) => {
  try {
    const data = await positionsService.getByElection(req.params.electionId);
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const createPositionController = async (req: Request, res: Response) => {
  try {
    const data = await positionsService.create(req.body);
    res.status(201).json({ success: true, data });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const updatePositionController = async (req: Request, res: Response) => {
  try {
    const data = await positionsService.update(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const deletePositionController = async (req: Request, res: Response) => {
  try {
    const data = await positionsService.delete(req.params.id);
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};
