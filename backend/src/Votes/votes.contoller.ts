import { Request, Response } from "express";
import { votesService, NewVote } from "./votes.service";

export const getAllVotesController = async (_req: Request, res: Response) => {
  try {
    const data = await votesService.getAll();
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const getVoteByIdController = async (req: Request, res: Response) => {
  try {
    const data = await votesService.getById(req.params.id);
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const createVoteController = async (req: Request, res: Response) => {
  try {
    const data: NewVote = req.body;
    const result = await votesService.create(data);
    res.status(201).json({ success: true, data: result });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const deleteVoteController = async (req: Request, res: Response) => {
  try {
    const result = await votesService.delete(req.params.id);
    res.json({ success: true, data: result });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};
