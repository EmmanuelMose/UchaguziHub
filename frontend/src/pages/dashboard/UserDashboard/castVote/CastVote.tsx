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

  useEffect(() => { setLoading(true); CastVoteAPI.getElections().then(data => setElections(data)).catch(console.error).finally(() => setLoading(false)); }, []);
  useEffect(() => { if (!selectedElection) return; setLoading(true); CastVoteAPI.getPositions(selectedElection).then(data => { setPositions(data); setCurrentPositionIndex(0); setVotes({}); }).catch(console.error).finally(() => setLoading(false)); }, [selectedElection]);
  useEffect(() => { if (!positions.length) return; setLoading(true); CastVoteAPI.getCandidates(positions[currentPositionIndex].positionId).then(data => setCandidates(data)).catch(console.error).finally(() => setLoading(false)); }, [positions, currentPositionIndex]);

  const handleNext = () => setCurrentPositionIndex(prev => (prev + 1 < positions.length ? prev + 1 : prev));
  const handleVoteSelect = (candidateId: number) => { const positionId = positions[currentPositionIndex].positionId; setVotes(prev => ({ ...prev, [positionId]: candidateId })); };
  const handleSubmit = async () => {
    if (!voterId) return alert("Voter ID missing.");
    if (!selectedElection) return alert("Select an election.");
    if (!Object.keys(votes).length) return alert("No votes selected.");

    try {
      for (const [positionIdStr, candidateId] of Object.entries(votes)) {
        const positionIdNum = Number(positionIdStr);
        if (!candidateId || !positionIdNum) continue;
        await CastVoteAPI.castVote(voterId, candidateId, selectedElection, positionIdNum);
      }
      alert("Votes submitted successfully!");
      setVotes({}); setSelectedElection(null); setPositions([]); setCandidates([]); setCurrentPositionIndex(0);
    } catch (err: any) { alert("Error submitting vote: " + (err.response?.data?.message || err.message)); }
  };

  const allPositionsVoted = positions.length > 0 && positions.every(p => votes[p.positionId]);

  return (
    <div className="p-4 md:ml-72 transition-all duration-500">
      <h2 className="text-3xl font-bold mb-6 text-blue-100">Cast Your Vote</h2>

      <select value={selectedElection ?? ""} onChange={(e) => setSelectedElection(Number(e.target.value))} className="mb-6 w-full p-3 border rounded-lg bg-black text-white border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
        <option value="" disabled>Select an election</option>
        {elections.map(el => <option key={el.electionId} value={el.electionId}>{el.title}</option>)}
      </select>

      {loading && <p className="text-blue-400 animate-pulse">Loading...</p>}

      {!loading && positions.length > 0 && candidates.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-black/80 p-6 rounded-xl shadow-2xl border border-blue-700">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">{positions[currentPositionIndex].name}</h3>
            {currentPositionIndex + 1 < positions.length && <button onClick={handleNext} className="text-blue-300 hover:text-white transition-transform hover:scale-125"><IoArrowForward size={24} /></button>}
          </div>

          <div className="space-y-3">
            {candidates.map(c => (
              <motion.label key={c.candidateId} whileHover={{ scale: 1.02 }} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-blue-900 transition-all shadow-sm hover:shadow-lg">
                <input type="radio" name={`position-${positions[currentPositionIndex].positionId}`} checked={votes[positions[currentPositionIndex].positionId] === c.candidateId} onChange={() => handleVoteSelect(c.candidateId)} className="mr-3" />
                <div>
                  <p className="text-white font-medium">{c.fullName}</p>
                  {c.manifesto && <p className="text-blue-300 text-sm">{c.manifesto}</p>}
                </div>
              </motion.label>
            ))}
          </div>

          {allPositionsVoted && <button onClick={handleSubmit} className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105">Submit Votes</button>}
        </motion.div>
      )}
    </div>
  );
};

export default CastVote;