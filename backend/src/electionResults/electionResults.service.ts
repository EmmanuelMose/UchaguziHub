import  db  from "../Drizzle/db";
import { elections, positions, candidates, votes, users } from "../Drizzle/schema";
import { eq, and, sql } from "drizzle-orm";

export class ElectionResultsService {
  static async getAllElections() {
    return await db.select().from(elections).orderBy(elections.startDate);
  }

  static async getPositionsByElection(electionId: number) {
    return await db.select().from(positions).where(eq(positions.electionId, electionId));
  }

  static async getElectionResults(electionId: number) {
    const electionPositions = await this.getPositionsByElection(electionId);
    const results: any[] = [];

    for (const pos of electionPositions) {
      const totalVotesRes = await db
        .select({ count: sql<number>`COUNT(*)` })
        .from(votes)
        .where(and(eq(votes.electionId, electionId), eq(votes.positionId, pos.positionId)));

      const totalVotes = totalVotesRes[0].count;

      const candidatesStats = await db
        .select({
          candidateId: candidates.candidateId,
          fullName: users.fullName,
          manifesto: candidates.manifesto,
          voteCount: sql<number>`COUNT(${votes.voteId})`,
        })
        .from(candidates)
        .leftJoin(votes, eq(candidates.candidateId, votes.candidateId))
        .leftJoin(users, eq(candidates.userId, users.userId))
        .where(and(eq(candidates.electionId, electionId), eq(candidates.positionId, pos.positionId)))
        .groupBy(candidates.candidateId, users.fullName)
        .orderBy(sql`COUNT(${votes.voteId}) DESC`);

      const enrichedCandidates = candidatesStats.map((c) => ({
        ...c,
        percentage: totalVotes === 0 ? 0 : ((c.voteCount / totalVotes) * 100).toFixed(2),
      }));

      results.push({
        positionId: pos.positionId,
        positionName: pos.name,
        totalVotes,
        candidates: enrichedCandidates,
      });
    }

    return results;
  }
}
