import { db } from "../../db";
import { elections } from "../../schema";

export const electionsService = {
  getAll: async () => db.select().from(elections),
  getById: async (id: string) => db.select().from(elections).where(elections.electionId.eq(id)),
  create: async (data: Partial<typeof elections._type>) => db.insert(elections).values(data).returning(),
  update: async (id: string, data: Partial<typeof elections._type>) =>
    db.update(elections).set(data).where(elections.electionId.eq(id)).returning(),
  delete: async (id: string) => db.delete(elections).where(elections.electionId.eq(id)).returning(),
};
