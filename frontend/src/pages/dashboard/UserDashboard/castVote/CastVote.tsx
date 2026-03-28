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

  const voterId = 1;

  useEffect(() => {
    const fetchElections = async () => {
      const data = await CastVoteAPI.getElections();
      setElections(data);
    };
    fetchElections();
  }, []);

  useEffect(() => {
    if (!selectedElection) return;
    setLoading(true);
    const fetchPositions = async () => {
      const data = await CastVoteAPI.getPositions(selectedElection);
      setPositions(data);
      setCurrentPositionIndex(0);
      setLoading(false);
    };
    fetchPositions();
  }, [selectedElection]);

  useEffect(() => {
    if (positions.length === 0) return;
    setLoading(true);
    const fetchCandidates = async () => {
      const data = await CastVoteAPI.getCandidates(positions[currentPositionIndex].positionId);
      setCandidates(data);
      setLoading(false);
    };
    fetchCandidates();
  }, [positions, currentPositionIndex]);

  const handleNext = () => setCurrentPositionIndex(prev => (prev + 1 < positions.length ? prev + 1 : prev));
  const handleVoteSelect = (candidateId: number) => setVotes({ ...votes, [positions[currentPositionIndex].positionId]: candidateId });

  const handleSubmit = async () => {
    try {
      for (const position of positions) {
        await CastVoteAPI.castVote(voterId, votes[position.positionId], selectedElection!, position.positionId);
      }
      alert("Votes submitted successfully!");
      setVotes({});
      setSelectedElection(null);
      setPositions([]);
      setCandidates([]);
      setCurrentPositionIndex(0);
    } catch {
      alert("Error submitting votes");
    }
  };

  const allPositionsVoted = positions.length > 0 && positions.every(p => votes[p.positionId]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Cast Your Vote</h2>
      <select value={selectedElection ?? ""} onChange={e => setSelectedElection(Number(e.target.value))} className="mb-6 w-full p-3 border rounded">
        <option value="" disabled>Select an election</option>
        {elections.map(el => <option key={el.electionId} value={el.electionId}>{el.title}</option>)}
      </select>

      {loading && <p className="text-blue-600 animate-pulse">Loading...</p>}

      {!loading && positions.length > 0 && candidates.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white p-6 rounded shadow">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-semibold">{positions[currentPositionIndex].name}</h3>
            {currentPositionIndex + 1 < positions.length && (
              <button onClick={handleNext}><IoArrowForward size={24} /></button>
            )}
          </div>

          <div className="space-y-2">
            {candidates.map(c => (
              <label key={c.candidateId} className="flex items-center p-2 border rounded cursor-pointer">
                <input type="radio" name={`position-${positions[currentPositionIndex].positionId}`} checked={votes[positions[currentPositionIndex].positionId] === c.candidateId} onChange={() => handleVoteSelect(c.candidateId)} className="mr-2"/>
                <div>
                  <p>{c.fullName}</p>
                  {c.manifesto && <p className="text-sm text-gray-500">{c.manifesto}</p>}
                </div>
              </label>
            ))}
          </div>

          {allPositionsVoted && <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Submit Votes</button>}
        </motion.div>
      )}
    </div>
  );
};

export default CastVote;
