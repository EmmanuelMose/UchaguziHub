// src/Features/analytics/Analytics.tsx
import { useEffect, useState } from "react";
import { AnalyticsAPI, type Election, type PositionResult } from "../../../../Features/analytics/AnalyticsAPI";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { IoArrowForward } from "react-icons/io5";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#f472b6"];

const Analytics = () => {
  const [elections, setElections] = useState<Election[]>([]);
  const [selectedElection, setSelectedElection] = useState<number | null>(null);
  const [results, setResults] = useState<PositionResult[]>([]);
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchElections = async () => {
      const data = await AnalyticsAPI.getElections();
      setElections(data);
    };
    fetchElections();
  }, []);

  useEffect(() => {
    if (selectedElection === null) return;
    setLoading(true);
    const fetchResults = async () => {
      const data = await AnalyticsAPI.getResults(selectedElection);
      setResults(data);
      setCurrentPositionIndex(0); // reset to first position
      setLoading(false);
    };
    fetchResults();
  }, [selectedElection]);

  const handleNextPosition = () => {
    setCurrentPositionIndex((prev) =>
      prev + 1 < results.length ? prev + 1 : 0
    );
  };

  const currentPosition = results[currentPositionIndex];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Election Analytics</h2>

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

      {loading && <p className="text-blue-600 font-semibold animate-pulse">Loading analytics...</p>}

      {!loading && currentPosition && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-2xl shadow-lg transition-all hover:shadow-2xl mb-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-700">{currentPosition.positionName}</h3>
            {results.length > 1 && (
              <button
                onClick={handleNextPosition}
                className="text-2xl text-gray-500 hover:text-gray-800 transition-transform hover:scale-110"
              >
                <IoArrowForward />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-xl shadow-inner">
              <h4 className="text-lg font-medium mb-2 text-gray-700">Votes - Bar Chart</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={currentPosition.candidates.map(c => ({
                    name: c.fullName,
                    votes: c.voteCount,
                  }))}
                  margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="votes" fill="#3b82f6">
                    {currentPosition.candidates.map((_, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl shadow-inner">
              <h4 className="text-lg font-medium mb-2 text-gray-700">Votes - Pie Chart</h4>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={currentPosition.candidates.map(c => ({
                      name: c.fullName,
                      value: c.voteCount,
                    }))}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {currentPosition.candidates.map((_, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      )}

      {!loading && selectedElection !== null && results.length === 0 && (
        <p className="text-gray-600 mt-4">No analytics available yet for this election.</p>
      )}
    </div>
  );
};

export default Analytics;
