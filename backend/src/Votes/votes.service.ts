import db from "../Drizzle/db";
import { votes } from "../Drizzle/schema";
import { eq } from "drizzle-orm";

export interface Vote {
  voteId: string;
  voterId: string;
  candidateId: string;
  electionId: string;
  positionId: string;
  createdAt: Date;
}

export interface NewVote {
  voterId: string;
  candidateId: string;
  electionId: string;
  positionId: string;
}

export const votesService = {
  getAll: async (): Promise<Vote[]> => {
    return await db.query.votes.findMany();
  },

  getById: async (id: string): Promise<Vote | null> => {
    const result = await db.query.votes.findFirst({
      where: eq(votes.voteId, id),
    });
    return result || null;
  },

  create: async (data: NewVote): Promise<Vote> => {
    const [created] = await db.insert(votes).values(data).returning();
    return created;
  },

  delete: async (id: string): Promise<Vote | null> => {
    const [deleted] = await db.delete(votes)
      .where(eq(votes.voteId, id))
      .returning();
    return deleted || null;
  },
};
