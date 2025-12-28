import { db } from "../../db";
import { users } from "../../schema";

export const usersService = {
  getAll: async () => db.select().from(users),
  getById: async (id: string) => db.select().from(users).where(users.userId.eq(id)),
  create: async (data: Partial<typeof users._type>) => db.insert(users).values(data).returning(),
  update: async (id: string, data: Partial<typeof users._type>) =>
    db.update(users).set(data).where(users.userId.eq(id)).returning(),
  delete: async (id: string) => db.delete(users).where(users.userId.eq(id)).returning(),
};
