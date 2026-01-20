import { useEffect, useState } from "react";
import { CastVoteAPI } from "../../../../Features/castVote/castVoteAPI";
import { motion } from "framer-motion";

const CastVote = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [elections, setElections] = useState<any[]>([]);
  const [positions, setPositions] = useState<any[]>([]);
  const [candidatesMap, setCandidatesMap] = useState<Record<string, any[]>>({});
  const [selectedVotes, setSelectedVotes] = useState<Record<string, string>>({});
  const [electionId, setElectionId] = useState("");
  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load elections
  useEffect(() => {
    CastVoteAPI.getElections().then((res) => {
      if (res.success) setElections(res.data);
    });
  }, []);

  // Load positions and candidates when election changes
  useEffect(() => {
    if (!electionId) return;
    setPositions([]);
    setCandidatesMap({});
    setSelectedVotes({});
    setAlreadyVoted(false);
    setLoading(true);

    // Check if user already voted
    CastVoteAPI.checkIfVoted(user.userId, electionId).then((res) => {
      if (res.success && res.data.length > 0) {
        setAlreadyVoted(true);
        setLoading(false);
        return;
      }

      // Load positions and candidates if not voted
      CastVoteAPI.getPositionsByElection(electionId).then(async (res) => {
        if (!res.success) {
          setLoading(false);
          return;
        }

        setPositions(res.data);
        const map: Record<string, any[]> = {};
        await Promise.all(
          res.data.map(async (position: any) => {
            const cRes = await CastVoteAPI.getCandidatesByPosition(position.positionId);
            if (cRes.success) map[position.positionId] = cRes.data;
          })
        );
        setCandidatesMap(map);
        setLoading(false);
      });
    });
  }, [electionId]);

  const handleSelectCandidate = (positionId: string, candidateId: string) => {
    setSelectedVotes((prev) => ({ ...prev, [positionId]: candidateId }));
  };

  const submitVote = async () => {
    if (Object.keys(selectedVotes).length !== positions.length) {
      alert("Please vote for all positions before submitting.");
      return;
    }

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
      alert("Vote cast successfully!");
      setSelectedVotes({});
      setAlreadyVoted(true);
    } catch (err: any) {
      alert(err.message || "Something went wrong while casting your vote.");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
        Cast Your Vote
      </h1>

      {/* Election Selector */}
      <div className="max-w-md mx-auto mb-8">
        <select
          className="select select-bordered w-full shadow-lg transition duration-300 hover:scale-105"
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

      {loading && (
        <div className="text-center text-gray-500 font-medium animate-pulse mb-6">
          Loading election data...
        </div>
      )}

      {alreadyVoted && (
        <div className="text-center text-red-500 font-bold mb-6 animate-bounce">
          You have already voted in this election.
        </div>
      )}

      {/* Positions and Candidates */}
      {positions.length > 0 && !alreadyVoted && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {positions.map((position) => (
            <motion.div
              key={position.positionId}
              className="card bg-white shadow-xl border rounded-lg hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.03 }}
            >
              <div className="card-body">
                <h2 className="card-title text-xl font-semibold mb-4">{position.name}</h2>
                <div className="space-y-3">
                  {(candidatesMap[position.positionId] || []).map((candidate) => (
                    <label
                      key={candidate.candidateId}
                      className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-purple-50 transition-colors"
                    >
                      <input
                        type="radio"
                        name={position.positionId}
                        className="radio radio-primary"
                        checked={selectedVotes[position.positionId] === candidate.candidateId}
                        onChange={() =>
                          handleSelectCandidate(position.positionId, candidate.candidateId)
                        }
                      />
                      <span className="font-medium">{candidate.faculty ?? candidate.name ?? "Candidate"}</span>
                    </label>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Submit Button */}
      {positions.length > 0 && !alreadyVoted && (
        <div className="mt-10 text-center">
          <motion.button
            className="btn btn-primary px-12 py-3 text-lg font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
            disabled={Object.keys(selectedVotes).length === 0}
            onClick={submitVote}
            whileTap={{ scale: 0.95 }}
          >
            Submit Vote
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default CastVote;
