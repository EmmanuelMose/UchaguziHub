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
    return results.map(u => ({ ...u, isVerified: u.isVerified ?? false }));
  },

  getById: async (id: string): Promise<User | null> => {
    const result = await db.query.users.findFirst({
      where: eq(users.userId, id),
    });
    return result ? { ...result, isVerified: result.isVerified ?? false } : null;
  },

  create: async (data: NewUser): Promise<User> => {
    const [created] = await db.insert(users).values(data).returning();
    return { ...created, isVerified: created.isVerified ?? false };
  },

  update: async (id: string, data: Partial<NewUser>): Promise<User | null> => {
    const [updated] = await db.update(users)
      .set(data)
      .where(eq(users.userId, id))
      .returning();
    return updated ? { ...updated, isVerified: updated.isVerified ?? false } : null;
  },

  delete: async (id: string): Promise<User | null> => {
    const [deleted] = await db.delete(users)
      .where(eq(users.userId, id))
      .returning();
    return deleted ? { ...deleted, isVerified: deleted.isVerified ?? false } : null;
  },
};
