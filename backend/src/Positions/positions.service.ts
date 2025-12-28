import db from "../Drizzle/db";
import { positions } from "../Drizzle/schema";
import { eq } from "drizzle-orm";

export interface Position {
  positionId: string;
  electionId: string;
  name: string;
  createdAt: Date;
}

export interface NewPosition {
  electionId: string;
  name: string;
}

export const positionsService = {
  getAll: async (): Promise<Position[]> => {
    return await db.query.positions.findMany();
  },

  getById: async (id: string): Promise<Position | null> => {
    const result = await db.query.positions.findFirst({
      where: eq(positions.positionId, id),
    });
    return result || null;
  },

  getByElection: async (electionId: string): Promise<Position[]> => {
    return await db.query.positions.findMany({
      where: eq(positions.electionId, electionId),
    });
  },

  create: async (data: NewPosition): Promise<Position> => {
    const [created] = await db.insert(positions).values(data).returning();
    return created;
  },

  update: async (id: string, data: Partial<NewPosition>): Promise<Position | null> => {
    const [updated] = await db.update(positions)
      .set(data)
      .where(eq(positions.positionId, id))
      .returning();
    return updated || null;
  },

  delete: async (id: string): Promise<Position | null> => {
    const [deleted] = await db.delete(positions)
      .where(eq(positions.positionId, id))
      .returning();
    return deleted || null;
  },
};
