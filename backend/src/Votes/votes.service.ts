import db from "../Drizzle/db";
import { votes, candidates, positions, users } from "../Drizzle/schema";
import { eq, and } from "drizzle-orm";

export class VotesService {
  static async castVote(
    voterId: number,
    candidateId: number,
    electionId: number,
    positionId: number
  ) {
    if (!voterId || !candidateId || !electionId || !positionId) {
      throw new Error("Missing required fields");
    }

    const existingVote = await db
      .select()
      .from(votes)
      .where(
        and(
          eq(votes.voterId, voterId),
          eq(votes.positionId, positionId),
          eq(votes.electionId, electionId)
        )
      );

    if (existingVote.length > 0) {
      throw new Error("You have already voted for this position");
    }

    const candidate = await db
      .select()
      .from(candidates)
      .where(
        and(
          eq(candidates.candidateId, candidateId),
          eq(candidates.electionId, electionId),
          eq(candidates.positionId, positionId)
        )
      )
      .limit(1);

    if (candidate.length === 0) {
      throw new Error("Invalid candidate for this election/position");
    }

    const [created] = await db
      .insert(votes)
      .values({ voterId, candidateId, electionId, positionId })
      .returning();

    return created;
  }

  static async getPositionsByElection(electionId: number) {
    return await db
      .select({ positionId: positions.positionId, name: positions.name })
      .from(positions)
      .where(eq(positions.electionId, electionId));
  }

  static async getCandidatesByPosition(positionId: number) {
    return await db
      .select({
        candidateId: candidates.candidateId,
        fullName: users.fullName,
        manifesto: candidates.manifesto,
      })
      .from(candidates)
      .innerJoin(users, eq(candidates.userId, users.userId))
      .where(eq(candidates.positionId, positionId));
  }
}