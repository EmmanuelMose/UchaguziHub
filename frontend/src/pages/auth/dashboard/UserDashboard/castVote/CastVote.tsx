import { useEffect, useState } from "react";
import { CastVoteAPI } from "../../../../../Features/castVote/castVoteAPI";

const CastVote = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [elections, setElections] = useState<any[]>([]);
  const [positions, setPositions] = useState<any[]>([]);
  const [candidates, setCandidates] = useState<any[]>([]);

  const [electionId, setElectionId] = useState("");
  const [positionId, setPositionId] = useState("");
  const [candidateId, setCandidateId] = useState("");

  useEffect(() => {
    CastVoteAPI.getElections().then((res) => {
      if (res.success) setElections(res.data);
    });
  }, []);

  useEffect(() => {
    if (!electionId) return;

    CastVoteAPI.getPositionsByElection(electionId).then((res) => {
      if (res.success) setPositions(res.data);
    });
  }, [electionId]);

  useEffect(() => {
    if (!positionId) return;

    CastVoteAPI.getCandidatesByPosition(positionId).then((res) => {
      if (res.success) setCandidates(res.data);
    });
  }, [positionId]);

  const submitVote = async () => {
    const res = await CastVoteAPI.castVote({
      voterId: user.userId,
      candidateId,
      electionId,
      positionId,
    });

    if (res.success) {
      alert("Vote cast successfully ");
      setCandidateId("");
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Cast Your Vote</h1>

      <select
        className="select select-bordered w-full mb-4"
        value={electionId}
        onChange={(e) => setElectionId(e.target.value)}
      >
        <option value="">Select Election</option>
        {elections.map((e) => (
          <option key={e.electionId} value={e.electionId}>
            {e.title}
          </option>
        ))}
      </select>

      <select
        className="select select-bordered w-full mb-4"
        value={positionId}
        onChange={(e) => setPositionId(e.target.value)}
        disabled={!electionId}
      >
        <option value="">Select Position</option>
        {positions.map((p) => (
          <option key={p.positionId} value={p.positionId}>
            {p.name}
          </option>
        ))}
      </select>

      <select
        className="select select-bordered w-full mb-6"
        value={candidateId}
        onChange={(e) => setCandidateId(e.target.value)}
        disabled={!positionId}
      >
        <option value="">Select Candidate</option>
        {candidates.map((c) => (
          <option key={c.candidateId} value={c.candidateId}>
            {c.faculty ?? "Candidate"}
          </option>
        ))}
      </select>

      <button
        className="btn btn-primary w-full"
        disabled={!candidateId}
        onClick={submitVote}
      >
        Submit Vote
      </button>
    </div>
  );
};

export default CastVote;
