import axios from "axios";
import { ApiDomain } from "../../utils/APIDomain";

export type Election = { electionId: number; title: string };
export type Position = { positionId: number; name: string };
export type Candidate = { candidateId: number; fullName: string; manifesto?: string };

export const CastVoteAPI = {
  getElections: async (): Promise<Election[]> => {
    const res = await axios.get(`${ApiDomain}/api/elections`);
    return Array.isArray(res.data) ? res.data : [];
  },

  getPositions: async (electionId: number): Promise<Position[]> => {
    const res = await axios.get(`${ApiDomain}/api/votes/positions/${electionId}`);
    return Array.isArray(res.data) ? res.data : [];
  },

  getCandidates: async (positionId: number): Promise<Candidate[]> => {
    const res = await axios.get(`${ApiDomain}/api/votes/candidates/${positionId}`);
    return Array.isArray(res.data) ? res.data : [];
  },

  castVote: async (voterId: number, candidateId: number, electionId: number, positionId: number) => {
    const res = await axios.post(`${ApiDomain}/api/votes`, { voterId, candidateId, electionId, positionId });
    return res.data;
  },
};
