import { Request, Response } from "express";
import { systemUsersService } from "./systemUsers.service";

export const systemUsersController = {
  getAll: async (_, res: Response) => res.json(await systemUsersService.getAll()),
  getById: async (req: Request, res: Response) => res.json(await systemUsersService.getById(req.params.id)),
  create: async (req: Request, res: Response) => res.status(201).json(await systemUsersService.create(req.body)),
  update: async (req: Request, res: Response) => res.json(await systemUsersService.update(req.params.id, req.body)),
  delete: async (req: Request, res: Response) => res.json(await systemUsersService.delete(req.params.id)),
};
