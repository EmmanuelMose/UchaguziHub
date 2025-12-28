import { Request, Response } from "express";
import { positionsService } from "./positions.service";

export const positionsController = {
  getAll: async (_, res: Response) => res.json(await positionsService.getAll()),
  getById: async (req: Request, res: Response) => res.json(await positionsService.getById(req.params.id)),
  getByElection: async (req: Request, res: Response) => res.json(await positionsService.getByElection(req.params.electionId)),
  create: async (req: Request, res: Response) => res.status(201).json(await positionsService.create(req.body)),
  update: async (req: Request, res: Response) => res.json(await positionsService.update(req.params.id, req.body)),
  delete: async (req: Request, res: Response) => res.json(await positionsService.delete(req.params.id)),
};
