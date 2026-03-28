import { useState } from "react";
import { submitComplaint } from "../../../../Features/complains/userComplainAPI";

const UserComplain = () => {
  const [complaint, setComplaint] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Adjust this based on how you store logged-in user
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!complaint.trim()) {
      setError("Complaint cannot be empty");
      return;
    }

    if (!user?.userId) {
      setError("User not authenticated");
      return;
    }

    try {
      setLoading(true);

      await submitComplaint({
        userId: user.userId,
        complaint,
      });

      setSuccess("Complaint submitted successfully");
      setComplaint("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Submit a Complaint</h2>

      {error && (
        <div className="mb-3 text-red-600 bg-red-100 p-2 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-3 text-green-600 bg-green-100 p-2 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <textarea
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          placeholder="Describe your issue..."
          rows={5}
          className="w-full border rounded p-3 focus:outline-none focus:ring"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>
      </form>
    </div>
  );
};

export default UserComplain;
