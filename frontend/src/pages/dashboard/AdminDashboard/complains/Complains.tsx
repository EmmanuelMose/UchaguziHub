import { useEffect, useState } from "react";
import { fetchComplaints, deleteComplaint, type Complaint } from "../../../../Features/admincomplains/ComplainsAPI";

const Complains = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadComplaints = async () => {
    try {
      const data = await fetchComplaints();
      setComplaints(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteComplaint(id);
      setComplaints((prev) => prev.filter((c) => c.complaintId !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Complaints</h1>

      <div className="space-y-4">
        {complaints.map((c) => (
          <div
            key={c.complaintId}
            className="border p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{c.complaint}</p>
              <p className="text-sm text-gray-500">
                User ID: {c.userId}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(c.createdAt).toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => handleDelete(c.complaintId)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Complains;