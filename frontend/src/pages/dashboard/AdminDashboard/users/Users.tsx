import { useEffect, useState } from "react";
import { fetchSystemUsers, createSystemUser, updateSystemUser, deleteSystemUser, type SystemUser, type NewSystemUser } from "../../../../Features/systemusers/systemUsersAPI";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const Users = () => {
  const [users, setUsers] = useState<SystemUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<NewSystemUser>({ fullName: "", email: "", role: "", registrationNumber: "" });
  const [editId, setEditId] = useState<string | null>(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchSystemUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadUsers(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateSystemUser(editId, form);
        setEditId(null);
      } else {
        await createSystemUser(form);
      }
      setForm({ fullName: "", email: "", role: "", registrationNumber: "" });
      setModalOpen(false);
      loadUsers();
    } catch (error) { console.error(error); }
  };

  const handleEdit = (user: SystemUser) => {
    setForm({ fullName: user.fullName, email: user.email, role: user.role, registrationNumber: user.registrationNumber || "" });
    setEditId(user.systemUserId);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await deleteSystemUser(id);
      loadUsers();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">System Users Management</h1>
      <button onClick={() => setModalOpen(true)} className="bg-blue-400 text-white px-4 py-2 rounded mb-4">Create System User</button>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">{editId ? "Edit User" : "Create User"}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" className="border p-2 rounded" required />
              <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" required />
              <input name="role" value={form.role} onChange={handleChange} placeholder="Role" className="border p-2 rounded" required />
              <input name="registrationNumber" value={form.registrationNumber} onChange={handleChange} placeholder="Registration Number" className="border p-2 rounded" />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => { setModalOpen(false); setEditId(null); }} className="px-4 py-2 border rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-400 text-white rounded">{editId ? "Update" : "Create"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto mt-4">
        <table className="w-full border rounded">
          <thead className="bg-blue-100 text-black">
            <tr>
              <th className="p-2 border">Full Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Active</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.systemUserId} className="text-center hover:bg-blue-50">
                <td className="p-2 border">{user.fullName}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.role}</td>
                <td className="p-2 border">{user.isActive ? "Yes" : "No"}</td>
                <td className="p-2 border flex justify-center gap-2">
                  <FiEdit className="cursor-pointer text-blue-500" onClick={() => handleEdit(user)} />
                  <FiTrash2 className="cursor-pointer text-red-500" onClick={() => handleDelete(user.systemUserId)} />
                </td>
              </tr>
            ))}
            {users.length === 0 && <tr><td colSpan={5} className="p-2 text-center text-gray-500">No users found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;