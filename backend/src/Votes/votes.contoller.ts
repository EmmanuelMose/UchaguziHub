import { Request, Response } from "express";
import { votesService } from "./votes.service";

export const votesController = {
  getAll: async (_, res: Response) => res.json(await votesService.getAll()),
  getById: async (req: Request, res: Response) => res.json(await votesService.getById(req.params.id)),
  create: async (req: Request, res: Response) => res.status(201).json(await votesService.create(req.body)),
  delete: async (req: Request, res: Response) => res.json(await votesService.delete(req.params.id)),
};
