import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../api/api";

const UserTable = ({ onEdit }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (error) {
      console.error("Gagal fetch users", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin hapus user ini?")) {
      try {
        await deleteUser(id);
        fetchUsers(); // Refresh
      } catch (error) {
        alert("Gagal menghapus user");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter user berdasarkan search
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Daftar User</h2>

      {/* Input Pencarian */}
      <input
        type="text"
        placeholder="Cari nama atau email..."
        className="border p-2 mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">#</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Face ID</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((u, i) => (
              <tr key={u.id} className="border-b">
                <td className="p-2">{i + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.faceId}</td>
                <td>{u.phoneNumber}</td>
                <td>{u.role}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => onEdit(u)}
                    className="text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="text-red-600 hover:underline">
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center p-4">
                Tidak ditemukan
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
