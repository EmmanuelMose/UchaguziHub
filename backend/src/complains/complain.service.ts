import  db  from "../Drizzle/db";
import { complaints } from "../Drizzle/schema";
import { eq } from "drizzle-orm";

export const ComplainService = {
  createComplaint: async (data: {
    userId: string;
    complaint: string;
  }) => {
    const [result] = await db
      .insert(complaints)
      .values({
        userId: parseInt(data.userId),
        complaint: data.complaint,
      })
      .returning();
    return result;
  },

  getAllComplaints: async () => {
    return db.select().from(complaints);
  },

  getComplaintsByUser: async (userId: string) => {
    return db
      .select()
      .from(complaints)
      .where(eq(complaints.userId, parseInt(userId)));
  },

  deleteComplaint: async (complaintId: string) => {
    await db
      .delete(complaints)
      .where(eq(complaints.complaintId, parseInt(complaintId)));
    return true;
  }
};
