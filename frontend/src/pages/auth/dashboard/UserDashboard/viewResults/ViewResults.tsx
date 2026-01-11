import { useEffect, useState } from "react";
import { ViewResultsAPI } from "../../../../../Features/viewResults/ViewResultAPI";

const ViewResults = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [electionId, setElectionId] = useState("");

  useEffect(() => {
    if (!electionId) return;

    ViewResultsAPI.getCandidatesByElection(electionId).then((res) => {
      if (res.success) setCandidates(res.data);
    });
  }, [electionId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Election Results</h1>

      <input
        type="text"
        placeholder="Enter Election ID"
        className="input input-bordered mb-6 w-full max-w-md"
        onChange={(e) => setElectionId(e.target.value)}
      />

      {candidates.length === 0 && electionId && (
        <p className="text-gray-500">No results available.</p>
      )}

      <div className="grid gap-4">
        {candidates.map((c) => (
          <div
            key={c.candidateId}
            className="card bg-base-100 shadow"
          >
            <div className="card-body">
              <h2 className="font-semibold">
                {c.faculty ?? "Candidate"}
              </h2>
              <p className="text-sm text-gray-600">
                Position ID: {c.positionId}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewResults;
