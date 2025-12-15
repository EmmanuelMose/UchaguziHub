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

/* 
   USERS TABLE
 */
export const users = pgTable("users", {
  userId: uuid("user_id").defaultRandom().primaryKey(),

  fullName: varchar("full_name", { length: 150 }).notNull(),

  email: varchar("email", { length: 150 }).notNull().unique(),

  registrationNumber: varchar("registration_number", { length: 50 }).unique(),

  role: varchar("role", { length: 30 })
    .notNull()
    .default("Student"), 
  // Student | Admin | ElectoralOfficer | Observer

  passwordHash: text("password_hash").notNull(),

  verificationCode: varchar("verification_code", { length: 10 }),

  isVerified: boolean("is_verified").default(false),

  createdAt: timestamp("created_at").defaultNow().notNull()
});

/* 
   ELECTIONS TABLE
 */
export const elections = pgTable("elections", {
  electionId: uuid("election_id").defaultRandom().primaryKey(),

  title: varchar("title", { length: 200 }).notNull(),

  description: text("description"),

  startDate: timestamp("start_date").notNull(),

  endDate: timestamp("end_date").notNull(),

  status: varchar("status", { length: 30 })
    .notNull()
    .default("Upcoming"), 
  // Upcoming | Ongoing | Closed | Disabled

  createdBy: uuid("created_by")
    .references(() => users.userId)
    .notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull()
});

/* 
   POSITIONS TABLE
 */
export const positions = pgTable("positions", {
  positionId: uuid("position_id").defaultRandom().primaryKey(),

  electionId: uuid("election_id")
    .references(() => elections.electionId, { onDelete: "cascade" })
    .notNull(),

  name: varchar("name", { length: 100 }).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull()
});

/* 
   CANDIDATES TABLE
*/
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

/* 
   VOTES TABLE
*/
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
    // Enforce one vote per position per election
    uniqueVote: uniqueIndex("unique_vote_per_position")
      .on(table.voterId, table.electionId, table.positionId),

    voterIndex: index("idx_votes_voter").on(table.voterId),
    candidateIndex: index("idx_votes_candidate").on(table.candidateId)
  })
);

/* 
   AUTH LOGS (LOGIN / LOGOUT)
 */
export const authLogs = pgTable("auth_logs", {
  authLogId: uuid("auth_log_id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .references(() => users.userId, { onDelete: "cascade" })
    .notNull(),

  action: varchar("action", { length: 50 }).notNull(),
  // LOGIN | LOGOUT | FAILED_LOGIN

  ipAddress: varchar("ip_address", { length: 50 }),

  createdAt: timestamp("created_at").defaultNow().notNull()
});

/* 
   AUDIT LOGS
*/
export const auditLogs = pgTable("audit_logs", {
  logId: uuid("log_id").defaultRandom().primaryKey(),

  actorId: uuid("actor_id")
    .references(() => users.userId)
    .notNull(),

  action: varchar("action", { length: 255 }).notNull(),
  // CREATE_ELECTION, ADD_CANDIDATE, CAST_VOTE, PUBLISH_RESULTS

  entity: varchar("entity", { length: 100 }),
  // users, elections, candidates, votes

  ipAddress: varchar("ip_address", { length: 50 }),

  createdAt: timestamp("created_at").defaultNow().notNull()
});
