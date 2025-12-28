import { db } from "../../db";
import { positions } from "../../schema";

export const positionsService = {
  getAll: async () => db.select().from(positions),
  getById: async (id: string) => db.select().from(positions).where(positions.positionId.eq(id)),
  getByElection: async (electionId: string) => db.select().from(positions).where(positions.electionId.eq(electionId)),
  create: async (data: Partial<typeof positions._type>) => db.insert(positions).values(data).returning(),
  update: async (id: string, data: Partial<typeof positions._type>) =>
    db.update(positions).set(data).where(positions.positionId.eq(id)).returning(),
  delete: async (id: string) => db.delete(positions).where(positions.positionId.eq(id)).returning(),
};
