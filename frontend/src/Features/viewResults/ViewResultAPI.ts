import { ApiDomain } from "../../utils/APIDomain";

export const ViewResultsAPI = {
  getCandidatesByElection: async (electionId: string) => {
    const res = await fetch(
      `${ApiDomain}/api/candidates/election/${electionId}`
    );
    return res.json();
  },
};
