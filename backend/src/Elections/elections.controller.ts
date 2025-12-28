import { Request, Response } from "express";
import { electionsService, NewElection } from "./elections.service";

export const getAllElectionsController = async (_req: Request, res: Response) => {
  try {
    const data = await electionsService.getAll();
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const getElectionByIdController = async (req: Request, res: Response) => {
  try {
    const data = await electionsService.getById(req.params.id);
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const createElectionController = async (req: Request, res: Response) => {
  try {
    const { title, description, startDate, endDate, status, createdBy } = req.body;

    if (!title || !startDate || !endDate || !createdBy) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newElection: NewElection = {
      title,
      description: description || null,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      status: status || "Upcoming",
      createdBy,
    };

    const data = await electionsService.create(newElection);
    res.status(201).json({ success: true, data });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const updateElectionController = async (req: Request, res: Response) => {
  try {
    const { title, description, startDate, endDate, status } = req.body;

    const updatedData: Partial<NewElection> = {
      title,
      description,
      status,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    };

    const data = await electionsService.update(req.params.id, updatedData);
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const deleteElectionController = async (req: Request, res: Response) => {
  try {
    const data = await electionsService.delete(req.params.id);
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};
