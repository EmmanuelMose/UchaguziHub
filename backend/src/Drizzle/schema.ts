import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  uniqueIndex,
  index
} from "drizzle-orm/pg-core";

export const systemUsers = pgTable("system_users", {
  systemUserId: uuid("system_user_id").defaultRandom().primaryKey(),
  fullName: varchar("full_name", { length: 150 }).notNull(),
  email: varchar("email", { length: 150 }).notNull().unique(),
  registrationNumber: varchar("registration_number", { length: 50 }),
  role: varchar("role", { length: 30 }).notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const users = pgTable("users", {
  userId: uuid("user_id").defaultRandom().primaryKey(),
  systemUserId: uuid("system_user_id")
    .references(() => systemUsers.systemUserId, { onDelete: "cascade" })
    .notNull(),
  email: varchar("email", { length: 150 }).notNull().unique(),
  role: varchar("role", { length: 30 }).notNull(),
  passwordHash: text("password_hash").notNull(),
  verificationCode: varchar("verification_code", { length: 10 }),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const elections = pgTable("elections", {
  electionId: uuid("election_id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  status: varchar("status", { length: 30 }).notNull().default("Upcoming"),
  createdBy: uuid("created_by")
    .references(() => users.userId)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const positions = pgTable("positions", {
  positionId: uuid("position_id").defaultRandom().primaryKey(),
  electionId: uuid("election_id")
    .references(() => elections.electionId, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const candidates = pgTable("candidates", {
  candidateId: uuid("candidate_id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.userId, { onDelete: "cascade" })
    .notNull(),
  electionId: uuid("election_id")
    .references(() => elections.electionId, { onDelete: "cascade" })
    .notNull(),
  positionId: uuid("position_id")
    .references(() => positions.positionId, { onDelete: "cascade" })
    .notNull(),
  faculty: varchar("faculty", { length: 100 }),
  manifesto: text("manifesto"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const votes = pgTable(
  "votes",
  {
    voteId: uuid("vote_id").defaultRandom().primaryKey(),
    voterId: uuid("voter_id")
      .references(() => users.userId, { onDelete: "cascade" })
      .notNull(),
    candidateId: uuid("candidate_id")
      .references(() => candidates.candidateId, { onDelete: "cascade" })
      .notNull(),
    electionId: uuid("election_id")
      .references(() => elections.electionId, { onDelete: "cascade" })
      .notNull(),
    positionId: uuid("position_id")
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
