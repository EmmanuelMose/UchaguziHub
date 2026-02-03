// src/Features/viewResults/ViewResultsAPI.ts
import axios from "axios";
import { ApiDomain } from "../../utils/APIDomain";

export type Election = {
  electionId: number;
  title: string;
};

export type PositionResult = {
  positionId: number;
  positionName: string;
  totalVotes: number;
  candidates: {
    candidateId: number;
    fullName: string;
    manifesto?: string;
    voteCount: number;
    percentage: string;
  }[];
};

export const ViewResultsAPI = {
  getElections: async (): Promise<Election[]> => {
    const res = await axios.get(`${ApiDomain}/api/election-results`);
    return res.data;
  },

  getResults: async (electionId: number): Promise<PositionResult[]> => {
    const res = await axios.get(`${ApiDomain}/api/election-results/${electionId}/results`);
    return res.data;
  },
};
