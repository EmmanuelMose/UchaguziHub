import { db } from "../../db";
import { votes } from "../../schema";

export const votesService = {
  getAll: async () => db.select().from(votes),
  getById: async (id: string) => db.select().from(votes).where(votes.voteId.eq(id)),
  create: async (data: Partial<typeof votes._type>) => db.insert(votes).values(data).returning(),
  delete: async (id: string) => db.delete(votes).where(votes.voteId.eq(id)).returning(),
};
