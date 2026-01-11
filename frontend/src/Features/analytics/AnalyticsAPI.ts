import { ApiDomain } from "../../utils/APIDomain";

export interface CandidateResult {
  candidateId: string;
  candidateName: string;
  positionName: string;
  voteCount: number;
}

export const fetchElectionResults = async (electionId: string) => {
  const response = await fetch(
    `${ApiDomain}/api/votes/results/${electionId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch election results");
  }

  return response.json();
};
