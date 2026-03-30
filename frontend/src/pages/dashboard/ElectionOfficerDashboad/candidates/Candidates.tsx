import { useEffect, useState } from "react";
import { fetchCandidates, createCandidate, updateCandidate, deleteCandidate, type Candidate, type NewCandidate } from "../../../../Features/candidates/candidatesAPI";
import { fetchElections, type Election } from "../../../../Features/elections/electionsAPI";
import { fetchPositions, type Position } from "../../../../Features/positions/positionsAPI";
import { FaEdit, FaTrash } from "react-icons/fa";

const Candidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [elections, setElections] = useState<Election[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [, setSelectedElectionId] = useState<string>("");
  const [newCandidate, setNewCandidate] = useState<NewCandidate>({ userId: 0, electionId: "", positionId: "", faculty: "", manifesto: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadCandidates = async () => {
    const data = await fetchCandidates();
    setCandidates(data);
  };

  const loadElections = async () => {
    const data = await fetchElections();
    setElections(data);
  };

  const loadPositions = async (electionId: string) => {
    if (!electionId) {
      setPositions([]);
      return;
    }
    const data = await fetchPositions();
    setPositions(data.filter((p) => String(p.electionId) === electionId));
  };

  const handleElectionChange = (e: string) => {
    setSelectedElectionId(e);
    setNewCandidate({ ...newCandidate, electionId: e, positionId: "" });
    loadPositions(e);
  };

  const handleCreateOrUpdate = async () => {
    if (!newCandidate.electionId || !newCandidate.positionId || !newCandidate.userId) return;
    if (editingId) {
      const updated = await updateCandidate(editingId, newCandidate);
      setCandidates((prev) => prev.map((c) => (c.candidateId === editingId ? updated : c)));
    } else {
      const created = await createCandidate(newCandidate);
      setCandidates((prev) => [...prev, created]);
    }
    setNewCandidate({ userId: 0, electionId: "", positionId: "", faculty: "", manifesto: "" });
    setEditingId(null);
  };

  const handleEdit = (candidate: Candidate) => {
    setEditingId(candidate.candidateId);
    setSelectedElectionId(String(candidate.electionId));
    setNewCandidate({
      userId: candidate.userId,
      electionId: String(candidate.electionId),
      positionId: String(candidate.positionId),
      faculty: candidate.faculty || "",
      manifesto: candidate.manifesto || ""
    });
    loadPositions(String(candidate.electionId));
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this candidate?")) return;
    await deleteCandidate(id);
    setCandidates((prev) => prev.filter((c) => c.candidateId !== id));
  };

  useEffect(() => {
    loadCandidates();
    loadElections();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Candidates Management</h1>

      <div className="mb-6 flex gap-2 items-center">
        <input
          type="number"
          placeholder="User ID"
          className="border p-2 rounded"
          value={newCandidate.userId || ""}
          onChange={(e) => setNewCandidate({ ...newCandidate, userId: Number(e.target.value) })}
        />

        <select
          className="border p-2 rounded"
          value={newCandidate.electionId}
          onChange={(e) => handleElectionChange(e.target.value)}
        >
          <option value="">Select Election</option>
          {elections.map((el) => (
            <option key={el.electionId} value={el.electionId}>{el.title}</option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={newCandidate.positionId}
          onChange={(e) => setNewCandidate({ ...newCandidate, positionId: e.target.value })}
        >
          <option value="">Select Position</option>
          {positions.map((p) => (
            <option key={p.positionId} value={p.positionId}>{p.name}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Faculty"
          className="border p-2 rounded"
          value={newCandidate.faculty || ""}
          onChange={(e) => setNewCandidate({ ...newCandidate, faculty: e.target.value })}
        />

        <input
          type="text"
          placeholder="Manifesto"
          className="border p-2 rounded"
          value={newCandidate.manifesto || ""}
          onChange={(e) => setNewCandidate({ ...newCandidate, manifesto: e.target.value })}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleCreateOrUpdate}
        >
          {editingId ? "Update" : "Create"}
        </button>
      </div>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">User ID</th>
            <th className="border p-2">Election</th>
            <th className="border p-2">Position</th>
            <th className="border p-2">Faculty</th>
            <th className="border p-2">Manifesto</th>
            <th className="border p-2">Created At</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c) => {
            const electionTitle = elections.find((e) => e.electionId === c.electionId)?.title || c.electionId;
            const positionName = positions.find((p) => p.positionId === c.positionId)?.name || c.positionId;
            return (
              <tr key={c.candidateId} className="hover:bg-gray-100">
                <td className="border p-2">{c.candidateId}</td>
                <td className="border p-2">{c.userId}</td>
                <td className="border p-2">{electionTitle}</td>
                <td className="border p-2">{positionName}</td>
                <td className="border p-2">{c.faculty}</td>
                <td className="border p-2">{c.manifesto}</td>
                <td className="border p-2">{new Date(c.createdAt).toLocaleString()}</td>
                <td className="border p-2 flex gap-2">
                  <button className="text-yellow-600" onClick={() => handleEdit(c)}><FaEdit /></button>
                  <button className="text-red-600" onClick={() => handleDelete(c.candidateId)}><FaTrash /></button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Candidates;