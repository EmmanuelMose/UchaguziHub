import db from "../Drizzle/db";
import { votes, users, candidates } from "../Drizzle/schema";
import { and, eq } from "drizzle-orm";

export interface Vote {
  voteId: string;
  voterId: string;
  candidateId: string;
  electionId: string;
  positionId: string;
  createdAt: Date;
}

export interface NewVote {
  voterId: string;
  candidateId: string;
  electionId: string;
  positionId: string;
}

export const votesService = {
  // Get all votes
  getAll: async (): Promise<Vote[]> => {
    return await db.query.votes.findMany();
  },

  // Get vote by ID
  getById: async (id: string): Promise<Vote | null> => {
    const vote = await db.query.votes.findFirst({
      where: eq(votes.voteId, id),
    });
    return vote || null;
  },

  // Create a new vote
  create: async (data: NewVote): Promise<Vote> => {
    // Check voter exists
    const voterExists = await db.query.users.findFirst({
      where: eq(users.userId, data.voterId)
    });
    if (!voterExists) throw new Error("Voter does not exist.");

    // Check candidate exists
    const candidateExists = await db.query.candidates.findFirst({
      where: eq(candidates.candidateId, data.candidateId)
    });
    if (!candidateExists) throw new Error("Candidate does not exist.");

    //Prevent voting more than once in the same election
    const existingElectionVote = await db.query.votes.findFirst({
      where: and(
        eq(votes.voterId, data.voterId),
        eq(votes.electionId, data.electionId)
      )
    });
    if (existingElectionVote) {
      throw new Error("You have already voted in this election.");
    }

    // Create vote
    const [created] = await db.insert(votes).values(data).returning();
    return created;
  },

  // Delete a vote
  delete: async (id: string): Promise<Vote | null> => {
    const [deleted] = await db.delete(votes)
      .where(eq(votes.voteId, id))
      .returning();
    return deleted || null;
  },
};
