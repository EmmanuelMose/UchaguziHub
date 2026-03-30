import { ApiDomain } from "../../utils/APIDomain";

export interface Election {
  electionId: number;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  status: string;
}

export interface Position {
  positionId: number;
  name: string;
}

export interface CandidateResult {
  candidateId: number;
  fullName: string;
  manifesto: string;
  voteCount: number;
  percentage: string;
}

export interface PositionResult {
  positionId: number;
  positionName: string;
  totalVotes: number;
  candidates: CandidateResult[];
}

const BASE_URL = `${ApiDomain}/api/election-results`;

export const fetchElections = async (): Promise<Election[]> => {
  const res = await fetch(BASE_URL);
  const json = await res.json();
  if (!res.ok) throw new Error("Failed to fetch elections");
  return json;
};

export const fetchPositions = async (electionId: number): Promise<Position[]> => {
  const res = await fetch(`${BASE_URL}/${electionId}/positions`);
  const json = await res.json();
  if (!res.ok) throw new Error("Failed to fetch positions");
  return json;
};

export const fetchResults = async (electionId: number): Promise<PositionResult[]> => {
  const res = await fetch(`${BASE_URL}/${electionId}/results`);
  const json = await res.json();
  if (!res.ok) throw new Error("Failed to fetch results");
  return json;
};