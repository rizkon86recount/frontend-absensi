import { useState, useEffect } from "react";
import { createUser, updateUser } from "../api/api";

const initialForm = {
  name: "",
  email: "",
  password: "",
  faceId: "",
  phoneNumber: "",
  role: "USER",
};

const UserForm = ({ onSuccess, editData = null, onCancel }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editData) {
      setForm({ ...editData, password: "" }); // Kosongkan password saat edit
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...form,
      faceId: form.faceId.startsWith("user_")
        ? form.faceId
        : `user_${form.faceId}`,
    };

    try {
      if (editData) {
        await updateUser(editData.id, formattedData);
        alert("User berhasil diperbarui");
      } else {
        await createUser(formattedData);
        alert("User berhasil ditambahkan");
      }
      onSuccess();
      setForm(initialForm);
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menyimpan data");
    }
  };

  return (
    <div className="border p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">
        {editData ? "Edit User" : "Tambah User"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Nama"
          value={form.name}
          onChange={handleChange}
          className="border w-full p-2"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border w-full p-2"
          required
        />
        <input
          type="text"
          name="faceId"
          placeholder="Nomor ID (cth: 5 → user_5)"
          value={form.faceId}
          onChange={handleChange}
          className="border w-full p-2"
        />

        <input
          type="text"
          name="phoneNumber"
          placeholder="No HP"
          value={form.phoneNumber}
          onChange={handleChange}
          className="border w-full p-2"
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="border w-full p-2">
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <input
          type="password"
          name="password"
          placeholder={editData ? "Kosongkan jika tidak diubah" : "Password"}
          value={form.password}
          onChange={handleChange}
          className="border w-full p-2"
          required={!editData}
        />
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2">
            {editData ? "Update" : "Tambah"}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 px-4 py-2">
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserForm;
