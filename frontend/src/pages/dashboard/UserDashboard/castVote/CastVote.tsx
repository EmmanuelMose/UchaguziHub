import { useEffect, useState } from "react";
import { CastVoteAPI, type Election, type Position, type Candidate } from "../../../../Features/castVote/castVoteAPI";
import { motion } from "framer-motion";
import { IoArrowForward } from "react-icons/io5";

const CastVote = () => {
  const [elections, setElections] = useState<Election[]>([]);
  const [selectedElection, setSelectedElection] = useState<number | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [votes, setVotes] = useState<{ [positionId: number]: number }>({});
  const [loading, setLoading] = useState(false);

  const userRaw = localStorage.getItem("user");
  const voterId = userRaw ? JSON.parse(userRaw)?.userId : null;

  useEffect(() => {
    const fetchElections = async () => {
      setLoading(true);
      try {
        const data = await CastVoteAPI.getElections();
        setElections(data);
      } catch (err) {
        console.error("Error fetching elections:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchElections();
  }, []);

  useEffect(() => {
    if (!selectedElection) return;
    setLoading(true);
    const fetchPositions = async () => {
      try {
        const data = await CastVoteAPI.getPositions(selectedElection);
        setPositions(data);
        setCurrentPositionIndex(0);
        setVotes({});
      } catch (err) {
        console.error("Error fetching positions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPositions();
  }, [selectedElection]);

  useEffect(() => {
    if (positions.length === 0) return;
    setLoading(true);
    const fetchCandidates = async () => {
      try {
        const data = await CastVoteAPI.getCandidates(positions[currentPositionIndex].positionId);
        setCandidates(data);
      } catch (err) {
        console.error("Error fetching candidates:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, [positions, currentPositionIndex]);

  const handleNext = () =>
    setCurrentPositionIndex((prev) => (prev + 1 < positions.length ? prev + 1 : prev));

  const handleVoteSelect = (candidateId: number) => {
    const positionId = positions[currentPositionIndex].positionId;
    setVotes((prev) => ({
      ...prev,
      [positionId]: candidateId,
    }));
  };

  const handleSubmit = async () => {
    if (!voterId) {
      alert("Voter ID missing. Please login again.");
      return;
    }

    if (!selectedElection) {
      alert("Please select an election.");
      return;
    }

    const voteEntries = Object.entries(votes);
    if (voteEntries.length === 0) {
      alert("No votes selected to submit.");
      return;
    }

    try {
      for (const [positionIdStr, candidateId] of voteEntries) {
        const positionIdNum = Number(positionIdStr);
        if (!candidateId || !positionIdNum) continue;

        await CastVoteAPI.castVote(voterId, candidateId, selectedElection, positionIdNum);
      }
      alert("Votes submitted successfully!");
      setVotes({});
      setSelectedElection(null);
      setPositions([]);
      setCandidates([]);
      setCurrentPositionIndex(0);
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      alert("Error submitting vote: " + (err.response?.data?.message || err.message));
    }
  };

  const allPositionsVoted =
    positions.length > 0 && positions.every((p) => votes[p.positionId]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Cast Your Vote</h2>

      <select
        value={selectedElection ?? ""}
        onChange={(e) => setSelectedElection(Number(e.target.value))}
        className="mb-6 w-full p-3 border rounded"
      >
        <option value="" disabled>Select an election</option>
        {elections.map((el) => (
          <option key={el.electionId} value={el.electionId}>{el.title}</option>
        ))}
      </select>

      {loading && <p className="text-blue-600 animate-pulse">Loading...</p>}

      {!loading && positions.length > 0 && candidates.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded shadow"
        >
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-semibold">{positions[currentPositionIndex].name}</h3>
            {currentPositionIndex + 1 < positions.length && (
              <button onClick={handleNext}><IoArrowForward size={24} /></button>
            )}
          </div>

          <div className="space-y-2">
            {candidates.map((c) => (
              <label key={c.candidateId} className="flex items-center p-2 border rounded cursor-pointer">
                <input
                  type="radio"
                  name={`position-${positions[currentPositionIndex].positionId}`}
                  checked={votes[positions[currentPositionIndex].positionId] === c.candidateId}
                  onChange={() => handleVoteSelect(c.candidateId)}
                  className="mr-2"
                />
                <div>
                  <p>{c.fullName}</p>
                  {c.manifesto && <p className="text-sm text-gray-500">{c.manifesto}</p>}
                </div>
              </label>
            ))}
          </div>

          {allPositionsVoted && (
            <button
              onClick={handleSubmit}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Submit Votes
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default CastVote;