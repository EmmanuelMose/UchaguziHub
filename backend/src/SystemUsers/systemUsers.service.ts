import db from "../Drizzle/db";
import { systemUsers } from "../Drizzle/schema";
import { eq } from "drizzle-orm";

export interface SystemUser {
  systemUserId: string;
  fullName: string;
  email: string;
  registrationNumber: string | null;
  role: string;
  isActive: boolean;
  createdAt: Date;
}

export interface NewSystemUser {
  fullName: string;
  email: string;
  registrationNumber?: string | null;
  role: string;
  isActive?: boolean;
}

export const systemUsersService = {
  getAll: async (): Promise<SystemUser[]> => {
    const results = await db.query.systemUsers.findMany();
    return results.map(u => ({ ...u, systemUserId: String(u.systemUserId), isActive: u.isActive ?? true }));
  },

  getById: async (id: string): Promise<SystemUser | null> => {
    const result = await db.query.systemUsers.findFirst({
      where: eq(systemUsers.systemUserId, Number(id)),
    });
    return result ? { ...result, systemUserId: String(result.systemUserId), isActive: result.isActive ?? true } : null;
  },

  create: async (data: NewSystemUser): Promise<SystemUser> => {
    const [created] = await db.insert(systemUsers).values(data).returning();
    return { ...created, systemUserId: String(created.systemUserId), isActive: created.isActive ?? true };
  },

  update: async (id: string, data: Partial<NewSystemUser>): Promise<SystemUser | null> => {
    const [updated] = await db.update(systemUsers)
      .set(data)
      .where(eq(systemUsers.systemUserId, Number(id)))
      .returning();
    return updated ? { ...updated, systemUserId: String(updated.systemUserId), isActive: updated.isActive ?? true } : null;
  },

  delete: async (id: string): Promise<SystemUser | null> => {
    const [deleted] = await db.delete(systemUsers)
      .where(eq(systemUsers.systemUserId, Number(id)))
      .returning();
    return deleted ? { ...deleted, systemUserId: String(deleted.systemUserId), isActive: deleted.isActive ?? true } : null;
  },
};
