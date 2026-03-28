import db from "../Drizzle/db";
import { votes, candidates, positions } from "../Drizzle/schema";
import { eq, and } from "drizzle-orm";

export class VotesService {
  static async castVote(voterId: number, candidateId: number, electionId: number, positionId: number) {
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

    if (existingVote.length > 0) throw new Error("You have already voted for this position");

    const inserted = await db.insert(votes).values({
      voterId,
      candidateId,
      electionId,
      positionId,
    });

    return inserted;
  }

  static async getPositionsByElection(electionId: number) {
    return await db.select().from(positions).where(eq(positions.electionId, electionId));
  }

  static async getCandidatesByPosition(positionId: number) {
    return await db.select().from(candidates).where(eq(candidates.positionId, positionId));
  }
}
