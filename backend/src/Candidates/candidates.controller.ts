import { Request, Response } from "express";
import { candidatesService } from "./candidates.service";

export const candidatesController = {
  getAll: async (_, res: Response) => res.json(await candidatesService.getAll()),
  getById: async (req: Request, res: Response) => res.json(await candidatesService.getById(req.params.id)),
  getByElection: async (req: Request, res: Response) => res.json(await candidatesService.getByElection(req.params.electionId)),
  getByPosition: async (req: Request, res: Response) => res.json(await candidatesService.getByPosition(req.params.positionId)),
  create: async (req: Request, res: Response) => res.status(201).json(await candidatesService.create(req.body)),
  update: async (req: Request, res: Response) => res.json(await candidatesService.update(req.params.id, req.body)),
  delete: async (req: Request, res: Response) => res.json(await candidatesService.delete(req.params.id)),
};
