import db from "../Drizzle/db";
import { candidates } from "../Drizzle/schema";
import { eq } from "drizzle-orm";

interface Candidate {
  candidateId: string;
  userId: string;
  electionId: string;
  positionId: string;
  faculty: string | null;
  manifesto: string | null;
  createdAt: Date;
}

interface NewCandidate {
  userId: string;
  electionId: string;
  positionId: string;
  faculty?: string | null;
  manifesto?: string | null;
}

export const candidatesService = {
  getAll: async (): Promise<Candidate[]> => {
    return await db.query.candidates.findMany();
  },

  getById: async (id: string): Promise<Candidate | null> => {
    const result = await db.query.candidates.findFirst({
      where: eq(candidates.candidateId, id),
    });
    return result || null;
  },

  getByElection: async (electionId: string): Promise<Candidate[]> => {
  return await db.query.candidates.findMany({
    where: (c) => eq(c.electionId, electionId),
  });
},


  getByPosition: async (positionId: string): Promise<Candidate[]> => {
    return await db.query.candidates.findMany({
      where: eq(candidates.positionId, positionId),
    });
  },

  create: async (data: NewCandidate): Promise<Candidate> => {
    const [created] = await db.insert(candidates).values(data).returning();
    return created;
  },

  update: async (id: string, data: Partial<NewCandidate>): Promise<Candidate | null> => {
    const [updated] = await db.update(candidates)
      .set(data)
      .where(eq(candidates.candidateId, id))
      .returning();
    return updated || null;
  },

  delete: async (id: string): Promise<Candidate | null> => {
    const [deleted] = await db.delete(candidates)
      .where(eq(candidates.candidateId, id))
      .returning();
    return deleted || null;
  },
};
