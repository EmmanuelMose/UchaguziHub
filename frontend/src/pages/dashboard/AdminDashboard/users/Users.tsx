import { useEffect, useState } from "react";
import { fetchUsers, createUser, type User, type NewUser } from "../../../../Features/users/usersAPI";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<NewUser>({
    systemUserId: "",
    fullName: "",
    email: "",
    role: "",
    passwordHash: "",
    registrationNumber: "",
  });

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(form);
      setForm({
        systemUserId: "",
        fullName: "",
        email: "",
        role: "",
        passwordHash: "",
        registrationNumber: "",
      });
      loadUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">
        Users Management
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-blue-200 shadow-md rounded-lg p-6 mb-8 max-w-xl mx-auto"
      >
        <h2 className="text-xl font-semibold mb-4 text-blue-400">
          Create User
        </h2>

        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="systemUserId"
            placeholder="System User ID"
            value={form.systemUserId}
            onChange={handleChange}
            className="border border-blue-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="border border-blue-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border border-blue-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />

          <input
            type="text"
            name="role"
            placeholder="Role"
            value={form.role}
            onChange={handleChange}
            className="border border-blue-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />

          <input
            type="text"
            name="registrationNumber"
            placeholder="Registration Number"
            value={form.registrationNumber || ""}
            onChange={handleChange}
            className="border border-blue-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <input
            type="password"
            name="passwordHash"
            placeholder="Password"
            value={form.passwordHash}
            onChange={handleChange}
            className="border border-blue-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />

          <button
            type="submit"
            className="bg-blue-400 text-white py-2 rounded hover:bg-blue-500 transition"
          >
            Create User
          </button>
        </div>
      </form>

      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-blue-400">
          All Users
        </h2>

        {loading ? (
          <p className="text-center text-blue-400">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-blue-200 rounded-lg">
              <thead className="bg-blue-100 text-black">
                <tr>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Role</th>
                  <th className="p-2 border">Verified</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.userId}
                    className="text-center hover:bg-blue-50"
                  >
                    <td className="p-2 border">{user.fullName}</td>
                    <td className="p-2 border">{user.email}</td>
                    <td className="p-2 border">{user.role}</td>
                    <td className="p-2 border">
                      {user.isVerified ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {users.length === 0 && (
              <p className="text-center mt-4 text-gray-500">
                No users found
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;