import { ApiDomain } from "../../utils/APIDomain";

export const CastVoteAPI = {
  getElections: async () => {
    const res = await fetch(`${ApiDomain}/api/elections`);
    return res.json();
  },

  getPositionsByElection: async (electionId: string) => {
    const res = await fetch(`${ApiDomain}/api/positions/election/${electionId}`);
    return res.json();
  },

  getCandidatesByPosition: async (positionId: string) => {
    const res = await fetch(`${ApiDomain}/api/candidates/position/${positionId}`);
    return res.json();
  },

  castVote: async (payload: {
    voterId: string;
    candidateId: string;
    electionId: string;
    positionId: string;
  }) => {
    const res = await fetch(`${ApiDomain}/api/votes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.json();
  },

  checkIfVoted: async (voterId: string, electionId: string) => {
    const res = await fetch(`${ApiDomain}/api/votes?voterId=${voterId}&electionId=${electionId}`);
    return res.json();
  }
};
