import { Request, Response } from "express";
import { usersService } from "./users.service";

export const usersController = {
  getAll: async (_, res: Response) => res.json(await usersService.getAll()),
  getById: async (req: Request, res: Response) => res.json(await usersService.getById(req.params.id)),
  create: async (req: Request, res: Response) => res.status(201).json(await usersService.create(req.body)),
  update: async (req: Request, res: Response) => res.json(await usersService.update(req.params.id, req.body)),
  delete: async (req: Request, res: Response) => res.json(await usersService.delete(req.params.id)),
};
