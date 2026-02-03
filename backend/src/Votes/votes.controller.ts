import { Request, Response } from "express";
import { VotesService } from "../Votes/votes.service";

export class VotesController {
  static async castVote(req: Request, res: Response) {
    const { voterId, candidateId, electionId, positionId } = req.body;
    try {
      const vote = await VotesService.castVote(voterId, candidateId, electionId, positionId);
      res.json({ message: "Vote cast successfully", vote });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async getPositions(req: Request, res: Response) {
    const { electionId } = req.params;
    try {
      const positions = await VotesService.getPositionsByElection(Number(electionId));
      res.json(positions);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async getCandidates(req: Request, res: Response) {
    const { positionId } = req.params;
    try {
      const candidates = await VotesService.getCandidatesByPosition(Number(positionId));
      res.json(candidates);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
