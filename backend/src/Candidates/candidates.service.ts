import { db } from "../../db";
import { candidates } from "../../schema";

export const candidatesService = {
  getAll: async () => db.select().from(candidates),
  getById: async (id: string) => db.select().from(candidates).where(candidates.candidateId.eq(id)),
  getByElection: async (electionId: string) => db.select().from(candidates).where(candidates.electionId.eq(electionId)),
  getByPosition: async (positionId: string) => db.select().from(candidates).where(candidates.positionId.eq(positionId)),
  create: async (data: Partial<typeof candidates._type>) => db.insert(candidates).values(data).returning(),
  update: async (id: string, data: Partial<typeof candidates._type>) =>
    db.update(candidates).set(data).where(candidates.candidateId.eq(id)).returning(),
  delete: async (id: string) => db.delete(candidates).where(candidates.candidateId.eq(id)).returning(),
};
