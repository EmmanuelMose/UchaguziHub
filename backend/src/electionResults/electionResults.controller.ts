import { Request, Response } from "express";
import { ElectionResultsService } from "../electionResults/electionResults.service";

export class ElectionResultsController {
  static async getAllElections(req: Request, res: Response) {
    const data = await ElectionResultsService.getAllElections();
    res.json(data);
  }

  static async getPositions(req: Request, res: Response) {
    const { electionId } = req.params;
    const data = await ElectionResultsService.getPositionsByElection(Number(electionId));
    res.json(data);
  }

  static async getElectionResults(req: Request, res: Response) {
    const { electionId } = req.params;
    const data = await ElectionResultsService.getElectionResults(Number(electionId));
    res.json(data);
  }
}
