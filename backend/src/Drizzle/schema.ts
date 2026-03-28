import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
  uniqueIndex,
  index,
  integer
} from "drizzle-orm/pg-core";

export const systemUsers = pgTable("system_users", {
  systemUserId: serial("system_user_id").primaryKey(),
  fullName: varchar("full_name", { length: 150 }).notNull(),
  email: varchar("email", { length: 150 }).notNull().unique(),
  registrationNumber: varchar("registration_number", { length: 50 }),
  role: varchar("role", { length: 30 }).notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const users = pgTable("users", {
  userId: serial("user_id").primaryKey(),
  systemUserId: integer("system_user_id")
    .references(() => systemUsers.systemUserId, { onDelete: "cascade" })
    .notNull(),
  fullName: varchar("full_name", { length: 150 }).notNull(),
  registrationNumber: varchar("registration_number", { length: 50 }),
  email: varchar("email", { length: 150 }).notNull().unique(),
  role: varchar("role", { length: 30 }).notNull(),
  passwordHash: text("password_hash").notNull(),
  resetCode: varchar("reset_code", { length: 6 }),
  resetCodeExpiresAt: timestamp("reset_code_expires_at"),
  verificationCode: varchar("verification_code", { length: 10 }),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const elections = pgTable("elections", {
  electionId: serial("election_id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  status: varchar("status", { length: 30 }).default("Upcoming").notNull(),
  createdBy: integer("created_by")
    .references(() => users.userId, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const positions = pgTable("positions", {
  positionId: serial("position_id").primaryKey(),
  electionId: integer("election_id")
    .references(() => elections.electionId, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const candidates = pgTable("candidates", {
  candidateId: serial("candidate_id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.userId, { onDelete: "cascade" })
    .notNull(),
  electionId: integer("election_id")
    .references(() => elections.electionId, { onDelete: "cascade" })
    .notNull(),
  positionId: integer("position_id")
    .references(() => positions.positionId, { onDelete: "cascade" })
    .notNull(),
  faculty: varchar("faculty", { length: 100 }),
  manifesto: text("manifesto"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const votes = pgTable(
  "votes",
  {
    voteId: serial("vote_id").primaryKey(),
    voterId: integer("voter_id")
      .references(() => users.userId, { onDelete: "cascade" })
      .notNull(),
    candidateId: integer("candidate_id")
      .references(() => candidates.candidateId, { onDelete: "cascade" })
      .notNull(),
    electionId: integer("election_id")
      .references(() => elections.electionId, { onDelete: "cascade" })
      .notNull(),
    positionId: integer("position_id")
      .references(() => positions.positionId, { onDelete: "cascade" })
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull()
  },
  (table) => ({
    uniqueVote: uniqueIndex("unique_vote_per_position")
      .on(table.voterId, table.electionId, table.positionId),
    voterIndex: index("idx_votes_voter").on(table.voterId),
    candidateIndex: index("idx_votes_candidate").on(table.candidateId)
  })
);

export const complaints = pgTable("complaints", {
  complaintId: serial("complaint_id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.userId, { onDelete: "cascade" })
    .notNull(),
  complaint: text("complaint").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
