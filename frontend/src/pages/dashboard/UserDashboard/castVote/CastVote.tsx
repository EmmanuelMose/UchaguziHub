import { useEffect, useState } from "react";
import { CastVoteAPI } from "../../../../Features/castVote/castVoteAPI";

const CastVote = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [elections, setElections] = useState<any[]>([]);
  const [positions, setPositions] = useState<any[]>([]);
  const [candidatesMap, setCandidatesMap] = useState<Record<string, any[]>>({});
  const [selectedVotes, setSelectedVotes] = useState<Record<string, string>>({});
  const [electionId, setElectionId] = useState("");
  const [alreadyVoted, setAlreadyVoted] = useState(false);

  /* Load elections */
  useEffect(() => {
    CastVoteAPI.getElections().then((res) => {
      if (res.success) setElections(res.data);
    });
  }, []);

  /* Load positions and candidates when election changes */
  useEffect(() => {
    if (!electionId) return;
    setPositions([]);
    setCandidatesMap({});
    setSelectedVotes({});
    setAlreadyVoted(false);

    // Check if user has already voted in this election
    CastVoteAPI.checkIfVoted(user.userId, electionId).then((res) => {
      if (res.success && res.data.length > 0) {
        setAlreadyVoted(true);
        return;
      }

      // Load positions and candidates if not voted
      CastVoteAPI.getPositionsByElection(electionId).then(async (res) => {
        if (!res.success) return;
        setPositions(res.data);
        const map: Record<string, any[]> = {};
        await Promise.all(
          res.data.map(async (position: any) => {
            const cRes = await CastVoteAPI.getCandidatesByPosition(position.positionId);
            if (cRes.success) map[position.positionId] = cRes.data;
          })
        );
        setCandidatesMap(map);
      });
    });
  }, [electionId]);

  const handleSelectCandidate = (positionId: string, candidateId: string) => {
    setSelectedVotes((prev) => ({ ...prev, [positionId]: candidateId }));
  };

  const submitVote = async () => {
    try {
      for (const positionId in selectedVotes) {
        const res = await CastVoteAPI.castVote({
          voterId: user.userId,
          electionId,
          positionId,
          candidateId: selectedVotes[positionId],
        });

        if (!res.success) {
          alert(res.message);
          return;
        }
      }
      alert("Vote cast successfully");
      setSelectedVotes({});
      setAlreadyVoted(true);
    } catch (err: any) {
      alert(err.message || "Something went wrong while casting your vote.");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Cast Your Vote</h1>

      {/* Election Select */}
      <div className="max-w-md mx-auto mb-8">
        <select
          className="select select-bordered w-full"
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
      </div>

      {alreadyVoted && (
        <div className="text-center text-red-500 font-bold mb-6">
          You have already voted in this election.
        </div>
      )}

      {/* Positions grid */}
      {positions.length > 0 && !alreadyVoted && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {positions.map((position) => (
            <div key={position.positionId} className="card bg-base-100 shadow-md border">
              <div className="card-body">
                <h2 className="card-title mb-4">{position.name}</h2>
                <div className="space-y-3">
                  {(candidatesMap[position.positionId] || []).map((candidate) => (
                    <label
                      key={candidate.candidateId}
                      className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-base-200 transition"
                    >
                      <input
                        type="radio"
                        name={position.positionId}
                        className="radio radio-primary"
                        checked={selectedVotes[position.positionId] === candidate.candidateId}
                        onChange={() => handleSelectCandidate(position.positionId, candidate.candidateId)}
                      />
                      <span className="font-medium">{candidate.faculty ?? "Candidate"}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Submit */}
      {positions.length > 0 && !alreadyVoted && (
        <div className="mt-10 text-center">
          <button
            className="btn btn-primary px-12"
            disabled={Object.keys(selectedVotes).length === 0}
            onClick={submitVote}
          >
            Submit Vote
          </button>
        </div>
      )}
    </div>
  );
};

export default CastVote;
