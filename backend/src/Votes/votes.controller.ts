import { Request, Response } from "express";
import { VotesService } from "./votes.service";

export class VotesController {
  static async castVote(req: Request, res: Response) {
    try {
      const { voterId, candidateId, electionId, positionId } = req.body;

      if (!voterId || !candidateId || !electionId || !positionId) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }

      const vote = await VotesService.castVote(
        Number(voterId),
        Number(candidateId),
        Number(electionId),
        Number(positionId)
      );

      res.status(201).json({ success: true, data: vote });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  static async getPositions(req: Request, res: Response) {
    try {
      const data = await VotesService.getPositionsByElection(Number(req.params.electionId));
      res.json({ success: true, data });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  static async getCandidates(req: Request, res: Response) {
    try {
      const data = await VotesService.getCandidatesByPosition(Number(req.params.positionId));
      res.json({ success: true, data });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}