import { Request, Response } from "express";
import { ComplainService } from "./complain.service";

export const ComplainController = {
  create: async (req: Request, res: Response) => {
    try {
      const complaint = await ComplainService.createComplaint(req.body);
      res.status(201).json({ success: true, data: complaint });
    } catch {
      res.status(500).json({ success: false, message: "Failed to submit complaint" });
    }
  },

  getAll: async (_req: Request, res: Response) => {
    const complaints = await ComplainService.getAllComplaints();
    res.json({ success: true, data: complaints });
  },

  getByUser: async (req: Request, res: Response) => {
    const complaints = await ComplainService.getComplaintsByUser(req.params.userId);
    res.json({ success: true, data: complaints });
  },

  delete: async (req: Request, res: Response) => {
    await ComplainService.deleteComplaint(req.params.id);
    res.json({ success: true, message: "Complaint deleted" });
  }
};
