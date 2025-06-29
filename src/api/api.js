import axios from "axios";

const API = axios.create({
  baseURL: "http://203.194.114.211:3000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// === USER CRUD ===
export const getAllUsers = () => API.get("/users");
export const createUser = (data) => API.post("/users", data);
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);

// === AUTH ===
export const loginUser = (data) => API.post("/auth/login", data);

// === ABSENSI ===
export const getAbsensi = (bulan, tahun) =>
  API.get(`/absensi?bulan=${bulan}&tahun=${tahun}`);
