import { Request, Response } from "express";
import { votesService, NewVote } from "./votes.service";

// Get all votes
export const getAllVotesController = async (_req: Request, res: Response) => {
  try {
    const data = await votesService.getAll();
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get a vote by ID
export const getVoteByIdController = async (req: Request, res: Response) => {
  try {
    const data = await votesService.getById(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: "Vote not found" });
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create a vote
export const createVoteController = async (req: Request, res: Response) => {
  try {
    const data: NewVote = req.body;
    if (!data.voterId || !data.candidateId || !data.electionId || !data.positionId) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const createdVote = await votesService.create(data);
    res.status(201).json({ success: true, data: createdVote });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete a vote
export const deleteVoteController = async (req: Request, res: Response) => {
  try {
    const deleted = await votesService.delete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Vote not found" });
    res.json({ success: true, data: deleted });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Check if voter already voted
export const checkIfVotedController = async (req: Request, res: Response) => {
  try {
    const { voterId, electionId } = req.query;
    if (!voterId || !electionId) {
      return res.status(400).json({ success: false, message: "Missing voterId or electionId" });
    }

    const vote = await votesService.checkIfVoted(voterId as string, electionId as string);
    res.json({ success: true, data: vote ? [vote] : [] });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
