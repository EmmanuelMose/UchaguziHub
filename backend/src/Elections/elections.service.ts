import db from "../Drizzle/db";
import { elections } from "../Drizzle/schema";
import { eq } from "drizzle-orm";

export interface Election {
  electionId: string;
  title: string;
  description: string | null;
  startDate: Date;
  endDate: Date;
  status: string;
  createdBy: string;
  createdAt: Date;
}

export interface NewElection {
  title: string;
  description?: string | null;
  startDate: Date;
  endDate: Date;
  status?: string;
  createdBy: string;
}

export const electionsService = {
  getAll: async (): Promise<Election[]> => {
    return await db.query.elections.findMany();
  },

  getById: async (id: string): Promise<Election | null> => {
    const result = await db.query.elections.findFirst({
      where: eq(elections.electionId, id),
    });
    return result || null;
  },

  create: async (data: NewElection): Promise<Election> => {
    const [created] = await db.insert(elections).values(data).returning();
    return created;
  },

  update: async (id: string, data: Partial<NewElection>): Promise<Election | null> => {
    const [updated] = await db.update(elections)
      .set(data)
      .where(eq(elections.electionId, id))
      .returning();
    return updated || null;
  },

  delete: async (id: string): Promise<Election | null> => {
    const [deleted] = await db.delete(elections)
      .where(eq(elections.electionId, id))
      .returning();
    return deleted || null;
  },
};
