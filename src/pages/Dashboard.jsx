import { useEffect, useState } from "react";
import { getAbsensi, getAllUsers } from "../api/api";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [jumlahKaryawan, setJumlahKaryawan] = useState(0);
  const [jumlahAbsensiHariIni, setJumlahAbsensiHariIni] = useState(0);

  useEffect(() => {
    fetchKaryawan();
    fetchAbsensiHariIni();
  }, []);

  const fetchKaryawan = async () => {
    try {
      const res = await getAllUsers();
      setJumlahKaryawan(res.data.length);
    } catch (error) {
      console.error("Gagal mengambil data karyawan", error);
    }
  };

  const fetchAbsensiHariIni = async () => {
    try {
      const now = new Date();
      const bulan = now.getMonth() + 1;
      const tahun = now.getFullYear();
      const res = await getAbsensi(bulan, tahun);
      const hariIni = now.toLocaleDateString("sv-SE", {
        timeZone: "Asia/Jakarta",
      });
      const jumlah = res.data.data.filter(
        (absen) =>
          new Date(absen.timestamp).toLocaleDateString("sv-SE", {
            timeZone: "Asia/Jakarta",
          }) === hariIni
      ).length;
      setJumlahAbsensiHariIni(jumlah);
    } catch (error) {
      console.error("Gagal mengambil absensi hari ini", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold">Menu</h2>
        <nav className="space-y-2">
          <Link to="/dashboard" className="block hover:text-yellow-300">
            Dashboard
          </Link>
          <Link to="/absensi" className="block hover:text-yellow-300">
            Data Absensi
          </Link>
          <Link to="/users" className="block hover:text-yellow-300">
            Kelola Karyawan
          </Link>
          {/* Tambahkan menu lain jika perlu */}
        </nav>
      </aside>

      {/* Konten Dashboard */}
      <main className="flex-1 p-6 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-white rounded shadow">
            <h2 className="text-lg font-semibold">Jumlah Karyawan</h2>
            <p className="text-3xl font-bold">{jumlahKaryawan}</p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h2 className="text-lg font-semibold">Absensi Hari Ini</h2>
            <p className="text-3xl font-bold">{jumlahAbsensiHariIni}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
