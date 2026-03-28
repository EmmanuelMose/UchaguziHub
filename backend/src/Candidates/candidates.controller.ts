import { Request, Response } from "express";
import { candidatesService } from "./candidates.service";

export const getAllCandidatesController = async (_req: Request, res: Response) => {
  try {
    const data = await candidatesService.getAll();
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const getCandidateByIdController = async (req: Request, res: Response) => {
  try {
    const data = await candidatesService.getById(req.params.id);
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const getCandidatesByElectionController = async (req: Request, res: Response) => {
  try {
    const data = await candidatesService.getByElection(req.params.electionId);
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const getCandidatesByPositionController = async (req: Request, res: Response) => {
  try {
    const data = await candidatesService.getByPosition(req.params.positionId);
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const createCandidateController = async (req: Request, res: Response) => {
  try {
    const data = await candidatesService.create(req.body);
    res.status(201).json({ success: true, data });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const updateCandidateController = async (req: Request, res: Response) => {
  try {
    const data = await candidatesService.update(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const deleteCandidateController = async (req: Request, res: Response) => {
  try {
    const data = await candidatesService.delete(req.params.id);
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};
