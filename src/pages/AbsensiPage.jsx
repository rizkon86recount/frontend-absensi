import { useEffect, useState } from "react";
import { getAbsensi } from "../api/api";

const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const generateDatesInMonth = (month, year) => {
  const dates = [];
  const lastDay = new Date(year, month, 0).getDate();
  for (let d = 1; d <= lastDay; d++) {
    dates.push(new Date(year, month - 1, d));
  }
  return dates;
};

const AbsensiPage = () => {
  const currentDate = new Date();
  const [bulan, setBulan] = useState(currentDate.getMonth() + 1); // 1-12
  const [tahun, setTahun] = useState(currentDate.getFullYear());
  const [data, setData] = useState([]);

  const fetchAbsensi = async () => {
    try {
      const res = await getAbsensi(bulan, tahun);
      setData(res.data.data);
    } catch (error) {
      console.error("Gagal fetch absensi", error);
    }
  };

  useEffect(() => {
    fetchAbsensi();
  }, [bulan, tahun]);

  const tanggalList = generateDatesInMonth(bulan, tahun);

  const userMap = {};
  data.forEach((absen) => {
    const userId = absen.user.id;
    const dateKey = new Date(absen.timestamp).toLocaleDateString("sv-SE", {
      timeZone: "Asia/Jakarta",
    });
    if (!userMap[userId]) {
      userMap[userId] = {
        ...absen.user,
        absensi: {},
      };
    }
    userMap[userId].absensi[dateKey] = `Hadir (${new Date(
      absen.timestamp
    ).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
    })})`;
  });

  const rekapData = Object.values(userMap).map((user) => {
    const rekap = tanggalList.map((tgl) => {
      const key = tgl.toLocaleDateString("sv-SE", { timeZone: "Asia/Jakarta" });
      return user.absensi[key] || "";
    });
    return { ...user, rekap };
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Data Absensi</h2>

      {/* Filter bulan & tahun */}
      <div className="flex gap-4 mb-4">
        <select
          value={bulan}
          onChange={(e) => setBulan(parseInt(e.target.value))}
          className="border p-2 rounded">
          {months.map((m, i) => (
            <option key={i + 1} value={i + 1}>
              {m}
            </option>
          ))}
        </select>

        <select
          value={tahun}
          onChange={(e) => setTahun(parseInt(e.target.value))}
          className="border p-2 rounded">
          {[2023, 2024, 2025].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Tabel absensi */}
      <div className="overflow-auto max-h-[600px] border rounded shadow">
        <table className="w-full border-collapse text-sm font-mono">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="border px-3 py-2">No</th>
              <th className="border px-3 py-2">Nama</th>
              {tanggalList.map((tgl, i) => (
                <th key={i} className="border px-3 py-2 whitespace-nowrap">
                  {tgl.getDate()}
                  <br />
                  <span className="text-xs text-gray-600">
                    {days[tgl.getDay()]}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rekapData.length > 0 ? (
              rekapData.map((user, i) => (
                <tr key={user.id} className="even:bg-gray-50 hover:bg-blue-50">
                  <td className="border px-3 py-2 text-center">{i + 1}</td>
                  <td className="border px-3 py-2">{user.name}</td>
                  {user.rekap.map((val, j) => (
                    <td key={j} className="border px-3 py-2 text-center">
                      {val}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={tanggalList.length + 2}
                  className="text-center p-4">
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AbsensiPage;
