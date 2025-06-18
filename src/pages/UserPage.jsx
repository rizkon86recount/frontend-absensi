import { useState } from "react";
import { Link } from "react-router-dom";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";

const UsersPage = () => {
  const [editUser, setEditUser] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manajemen User</h1>
        <Link to="/absensi" className="text-blue-600 underline">
          Lihat Data Absensi
        </Link>
      </div>

      <UserForm
        editData={editUser}
        onSuccess={() => {
          setEditUser(null);
          refresh();
        }}
        onCancel={() => setEditUser(null)}
      />
      <UserTable key={refreshKey} onEdit={(user) => setEditUser(user)} />
    </div>
  );
};

export default UsersPage;
