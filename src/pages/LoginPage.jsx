import { useState } from "react";
import { loginUser } from "../api/api";

const LoginPage = ({ onLogin }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await loginUser(form);
      const { token } = res.data;

      localStorage.setItem("token", token);
      onLogin(); // Login sukses
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login Admin</h2>
        {error && <p className="text-red-600 mb-2 text-sm">{error}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="border w-full p-2 mb-3"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="border w-full p-2 mb-3"
        />
        <button type="submit" className="bg-blue-600 text-white w-full py-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
