import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {fetchElectionResults} from "../../../../../Features/analytics/AnalyticsAPI";
import type { CandidateResult } from "../../../../../Features/analytics/AnalyticsAPI";

const COLORS = ["#2563eb", "#16a34a", "#dc2626", "#f59e0b", "#7c3aed"];

const Analytics = ({ electionId }: { electionId: string }) => {
  const [data, setData] = useState<CandidateResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadResults = async () => {
      try {
        const res = await fetchElectionResults(electionId);
        setData(res.data || res);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, [electionId]);

  if (loading) {
    return <p className="text-center">Loading analytics...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="p-6 space-y-10">
      <h2 className="text-3xl font-bold text-center">
        Election Results Analytics
      </h2>

      {/* ===== Pie Chart ===== */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Vote Distribution (Pie Chart)
        </h3>

        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data}
              dataKey="voteCount"
              nameKey="candidateName"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ===== Bar Chart ===== */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Votes per Candidate (Bar Chart)
        </h3>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="candidateName" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="voteCount" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ===== Summary Table ===== */}
      <div className="bg-white p-6 rounded shadow overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Results Summary
        </h3>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Candidate</th>
              <th className="border px-4 py-2">Position</th>
              <th className="border px-4 py-2">Votes</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.candidateId}>
                <td className="border px-4 py-2">
                  {item.candidateName}
                </td>
                <td className="border px-4 py-2">
                  {item.positionName}
                </td>
                <td className="border px-4 py-2 text-center">
                  {item.voteCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;
