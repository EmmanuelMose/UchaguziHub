import  db  from "../Drizzle/db";
import { systemUsers } from "../Drizzle/schema";

export const systemUsersService = {
  getAll: async () => db.select().from(systemUsers),
  getById: async (id: string) => db.select().from(systemUsers).where(systemUsers.systemUserId.eq(id)),
  create: async (data: Partial<typeof systemUsers._type>) => db.insert(systemUsers).values(data).returning(),
  update: async (id: string, data: Partial<typeof systemUsers._type>) =>
    db.update(systemUsers).set(data).where(systemUsers.systemUserId.eq(id)).returning(),
  delete: async (id: string) => db.delete(systemUsers).where(systemUsers.systemUserId.eq(id)).returning(),
};
