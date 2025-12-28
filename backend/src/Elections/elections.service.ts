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
  // Ensure startDate and endDate are JS Date objects
  const insertData = {
    title: data.title,
    description: data.description || null,
    startDate: new Date(data.startDate),
    endDate: new Date(data.endDate),
    status: data.status || "Upcoming",
    createdBy: data.createdBy, // must provide a valid userId
  };

  const [created] = await db.insert(elections)
    .values(insertData)
    .returning();

  return created;
},

  update: async (id: string, data: Partial<NewElection>): Promise<Election | null> => {
    const updateData: Partial<NewElection> = {
      ...data,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
    };

    const [updated] = await db.update(elections)
      .set(updateData)
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
