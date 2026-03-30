import { useEffect, useState } from "react";
import { fetchPositions, createPosition, updatePosition, deletePosition, type Position, type NewPosition } from "../../../../Features/positions/positionsAPI"; // import positions API
import { fetchElections, type Election } from "../../../../Features/elections/electionsAPI"; // import elections API
import { FaEdit, FaTrash } from "react-icons/fa";

const Positions = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [elections, setElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newPosition, setNewPosition] = useState<NewPosition>({ electionId: 0, name: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  // Load all positions
  const loadPositions = async () => {
    try {
      setLoading(true);
      const data = await fetchPositions();
      setPositions(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Load all elections for the dropdown
  const loadElections = async () => {
    try {
      const data = await fetchElections();
      setElections(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateOrUpdate = async () => {
    if (!newPosition.electionId) {
      alert("Please select an election!");
      return;
    }
    if (!newPosition.name) {
      alert("Please enter a position name!");
      return;
    }
    try {
      if (editingId) {
        const updated = await updatePosition(editingId, newPosition);
        setPositions((prev) =>
          prev.map((p) => (p.positionId === editingId ? updated : p))
        );
      } else {
        const created = await createPosition(newPosition);
        setPositions((prev) => [...prev, created]);
      }
      setNewPosition({ electionId: 0, name: "" });
      setEditingId(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleEdit = (position: Position) => {
    setEditingId(position.positionId);
    setNewPosition({ electionId: position.electionId, name: position.name });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this position?")) return;
    try {
      await deletePosition(id);
      setPositions((prev) => prev.filter((p) => p.positionId !== id));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadPositions();
    loadElections();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Positions Management</h1>

      <div className="mb-6 flex gap-2 items-center">
        <select
          className="border p-2 rounded"
          value={newPosition.electionId}
          onChange={(e) => setNewPosition({ ...newPosition, electionId: parseInt(e.target.value) })}
        >
          <option value="">Select Election</option>
          {elections.map((el) => (
            <option key={el.electionId} value={el.electionId}>
              {el.title}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Position Name"
          className="border p-2 rounded"
          value={newPosition.name}
          onChange={(e) => setNewPosition({ ...newPosition, name: e.target.value })}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleCreateOrUpdate}
        >
          {editingId ? "Update" : "Create"}
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Election</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Created At</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((pos) => {
              const electionTitle = elections.find((e) => e.electionId === pos.electionId)?.title || pos.electionId;
              return (
                <tr key={pos.positionId} className="hover:bg-gray-100">
                  <td className="border p-2">{pos.positionId}</td>
                  <td className="border p-2">{electionTitle}</td>
                  <td className="border p-2">{pos.name}</td>
                  <td className="border p-2">{new Date(pos.createdAt).toLocaleString()}</td>
                  <td className="border p-2 flex gap-2">
                    <button
                      className="text-yellow-600"
                      onClick={() => handleEdit(pos)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => handleDelete(pos.positionId)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Positions;