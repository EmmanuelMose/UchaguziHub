import db from "../Drizzle/db";
import { users } from "../Drizzle/schema";
import { eq } from "drizzle-orm";

export interface User {
  userId: string;
  systemUserId: string;
  fullName: string;
  registrationNumber: string | null;
  email: string;
  role: string;
  passwordHash: string;
  resetCode: string | null;
  resetCodeExpiresAt: Date | null;
  verificationCode: string | null;
  isVerified: boolean;
  createdAt: Date;
}

export interface NewUser {
  systemUserId: string;
  fullName: string;
  registrationNumber?: string | null;
  email: string;
  role: string;
  passwordHash: string;
  resetCode?: string | null;
  resetCodeExpiresAt?: Date | null;
  verificationCode?: string | null;
  isVerified?: boolean;
}

export const usersService = {
  getAll: async (): Promise<User[]> => {
    const results = await db.query.users.findMany();
    return results.map(u => ({ ...u, userId: String(u.userId), systemUserId: String(u.systemUserId), isVerified: u.isVerified ?? false }));
  },

  getById: async (id: string): Promise<User | null> => {
    const result = await db.query.users.findFirst({
      where: eq(users.userId, Number(id)),
    });
    return result ? { ...result, userId: String(result.userId), systemUserId: String(result.systemUserId), isVerified: result.isVerified ?? false } : null;
  },

  create: async (data: NewUser): Promise<User> => {
    const insertData = { ...data, systemUserId: Number(data.systemUserId) };
    const [created] = await db.insert(users).values(insertData).returning();
    return { ...created, userId: String(created.userId), systemUserId: String(created.systemUserId), isVerified: created.isVerified ?? false };
  },

  update: async (id: string, data: Partial<NewUser>): Promise<User | null> => {
    const updateData: any = { ...data };
    if (data.systemUserId) {
      updateData.systemUserId = Number(data.systemUserId);
    }
    const [updated] = await db.update(users)
      .set(updateData)
      .where(eq(users.userId, Number(id)))
      .returning();
    return updated ? { ...updated, userId: String(updated.userId), systemUserId: String(updated.systemUserId), isVerified: updated.isVerified ?? false } : null;
  },

  delete: async (id: string): Promise<User | null> => {
    const [deleted] = await db.delete(users)
      .where(eq(users.userId, Number(id)))
      .returning();
    return deleted ? { ...deleted, userId: String(deleted.userId), systemUserId: String(deleted.systemUserId), isVerified: deleted.isVerified ?? false } : null;
  },
};
