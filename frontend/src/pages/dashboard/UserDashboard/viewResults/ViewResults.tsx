// src/Features/viewResults/ViewResults.tsx
import { useEffect, useState } from "react";
import { ViewResultsAPI, type Election, type PositionResult } from "../../../../Features/viewResults/ViewResultAPI";
import { motion } from "framer-motion";

const ViewResults = () => {
  const [elections, setElections] = useState<Election[]>([]);
  const [selectedElection, setSelectedElection] = useState<number | null>(null);
  const [results, setResults] = useState<PositionResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchElections = async () => {
      const data = await ViewResultsAPI.getElections();
      setElections(data);
    };
    fetchElections();
  }, []);

  useEffect(() => {
    if (selectedElection === null) return;
    setLoading(true);
    const fetchResults = async () => {
      const data = await ViewResultsAPI.getResults(selectedElection);
      setResults(data);
      setLoading(false);
    };
    fetchResults();
  }, [selectedElection]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Election Results</h2>

      <select
        value={selectedElection ?? ""}
        onChange={(e) => setSelectedElection(Number(e.target.value))}
        className="mb-6 w-full md:w-1/2 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        <option value="" disabled>
          Select an election
        </option>
        {elections.map((el) => (
          <option key={el.electionId} value={el.electionId}>
            {el.title}
          </option>
        ))}
      </select>

      {loading && (
        <p className="text-blue-600 font-semibold animate-pulse">Loading results...</p>
      )}

      {!loading && results.length > 0 && (
        <div className="space-y-8">
          {results.map((pos) => (
            <motion.div
              key={pos.positionId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-700">{pos.positionName}</h3>
              <p className="text-gray-500 mb-4">Total Votes: {pos.totalVotes}</p>

              <div className="space-y-3">
                {pos.candidates.map((c) => (
                  <div key={c.candidateId} className="w-full">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-800">{c.fullName}</span>
                      <span className="text-gray-600">{c.voteCount} votes ({c.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                      <motion.div
                        className="bg-blue-500 h-4 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${c.percentage}%` }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!loading && selectedElection !== null && results.length === 0 && (
        <p className="text-gray-600 mt-4">No results available yet for this election.</p>
      )}
    </div>
  );
};

export default ViewResults;
