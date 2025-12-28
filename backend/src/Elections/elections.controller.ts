import { Request, Response } from "express";
import { electionsService } from "./elections.service";

export const electionsController = {
  getAll: async (_, res: Response) => res.json(await electionsService.getAll()),
  getById: async (req: Request, res: Response) => res.json(await electionsService.getById(req.params.id)),
  create: async (req: Request, res: Response) => res.status(201).json(await electionsService.create(req.body)),
  update: async (req: Request, res: Response) => res.json(await electionsService.update(req.params.id, req.body)),
  delete: async (req: Request, res: Response) => res.json(await electionsService.delete(req.params.id)),
};
