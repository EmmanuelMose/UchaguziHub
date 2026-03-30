import { useEffect, useState } from "react";
import {
  fetchElections,
  createElection,
  updateElection,
  deleteElection,
  type Election,
} from "../../../../Features/elections/electionsAPI";
import { Pencil, Trash2 } from "lucide-react";

const Elections = () => {
  const [elections, setElections] = useState<Election[]>([]);
  const [form, setForm] = useState<any>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Upcoming",
    createdBy: 1,
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const load = async () => {
    const data = await fetchElections();
    setElections(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async () => {
    if (editingId) {
      await updateElection(editingId, form);
      setEditingId(null);
    } else {
      await createElection(form);
    }
    setForm({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      status: "Upcoming",
      createdBy: 1,
    });
    load();
  };

  const handleEdit = (el: Election) => {
    setEditingId(el.electionId);
    setForm({
      ...el,
      startDate: el.startDate.slice(0, 16),
      endDate: el.endDate.slice(0, 16),
    });
  };

  const handleDelete = async (id: number) => {
    await deleteElection(id);
    load();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Elections</h1>

      <div className="grid gap-3 mb-6">
        <input
          className="border p-2 rounded"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="border p-2 rounded"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="datetime-local"
          className="border p-2 rounded"
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
        />
        <input
          type="datetime-local"
          className="border p-2 rounded"
          value={form.endDate}
          onChange={(e) => setForm({ ...form, endDate: e.target.value })}
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white p-2 rounded"
        >
          {editingId ? "Update Election" : "Create Election"}
        </button>
      </div>

      <div className="space-y-4">
        {elections.map((el) => (
          <div
            key={el.electionId}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">{el.title}</h2>
              <p className="text-sm">{el.description}</p>
              <p className="text-xs text-gray-500">
                {new Date(el.startDate).toLocaleString()} -{" "}
                {new Date(el.endDate).toLocaleString()}
              </p>
            </div>

            <div className="flex gap-3">
              <Pencil
                className="cursor-pointer text-blue-600"
                onClick={() => handleEdit(el)}
              />
              <Trash2
                className="cursor-pointer text-red-600"
                onClick={() => handleDelete(el.electionId)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Elections;