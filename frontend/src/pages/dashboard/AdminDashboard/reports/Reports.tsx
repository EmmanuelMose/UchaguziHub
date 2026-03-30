import { useEffect, useRef, useState } from "react";
import {
  fetchElections,
  fetchResults,
  type Election,
  type PositionResult,
} from "../../../../Features/reports/reportsAPI";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Reports = () => {
  const [elections, setElections] = useState<Election[]>([]);
  const [selectedElection, setSelectedElection] = useState<number | null>(null);
  const [results, setResults] = useState<PositionResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const reportRef = useRef<HTMLDivElement>(null);

  const loadElections = async () => {
    try {
      const data = await fetchElections();
      setElections(data);
      if (data.length > 0) setSelectedElection(data[0].electionId);
    } catch (e) {
      console.error(e);
    }
  };

  const loadResults = async (electionId: number) => {
    try {
      setLoading(true);
      const data = await fetchResults(electionId);
      setResults(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const exportPDF = async () => {
    if (!reportRef.current) return;

    const clone = reportRef.current.cloneNode(true) as HTMLElement;

    clone.style.background = "#ffffff";

    clone.querySelectorAll("*").forEach((el) => {
      const element = el as HTMLElement;
      element.style.backgroundColor = "#ffffff";
      element.style.color = "#000000";
      element.style.borderColor = "#cccccc";
      element.style.boxShadow = "none";
    });

    clone.style.position = "fixed";
    clone.style.top = "-9999px";
    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, {
      backgroundColor: "#ffffff",
      scale: 2,
    });

    document.body.removeChild(clone);

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const width = 210;
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("election-report.pdf");
  };

  useEffect(() => {
    loadElections();
  }, []);

  useEffect(() => {
    if (selectedElection) loadResults(selectedElection);
  }, [selectedElection]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Election Reports</h1>

      <div className="flex gap-4 mb-6">
        <select
          className="border p-2 rounded"
          value={selectedElection || ""}
          onChange={(e) => setSelectedElection(Number(e.target.value))}
        >
          {elections.map((el) => (
            <option key={el.electionId} value={el.electionId}>
              {el.title}
            </option>
          ))}
        </select>

        <button
          onClick={exportPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Export PDF
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div ref={reportRef} className="space-y-8 bg-white p-4">
          {results.map((pos) => {
            const winner = pos.candidates[0];

            const chartData = {
              labels: pos.candidates.map((c) => c.fullName),
              datasets: [
                {
                  label: "Votes",
                  data: pos.candidates.map((c) => c.voteCount),
                },
              ],
            };

            return (
              <div key={pos.positionId} className="border p-4 rounded-xl shadow">
                <h2 className="text-xl font-bold mb-2">
                  {pos.positionName}
                </h2>

                <p className="text-sm mb-2">
                  Total Votes: {pos.totalVotes}
                </p>

                <p className="mb-4 font-semibold">
                  Winner: {winner?.fullName} ({winner?.voteCount} votes)
                </p>

                <Bar data={chartData} />

                <div className="mt-4 space-y-2">
                  {pos.candidates.map((c) => (
                    <div
                      key={c.candidateId}
                      className={`p-2 border rounded flex justify-between ${
                        c.candidateId === winner?.candidateId
                          ? "bg-gray-200"
                          : ""
                      }`}
                    >
                      <span>{c.fullName}</span>
                      <span>
                        {c.voteCount} votes ({c.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reports;