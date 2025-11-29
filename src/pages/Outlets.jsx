import { useEffect, useState } from "react";
import OutletCard from "../components/OutletCard";
import Skeleton from "../components/Skeleton";
import { API_BASE_URL } from "../config"; // Pastikan path import benar

export default function Outlets() {
  const [outlets, setOutlets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/outlets`)
      .then((res) => res.json())
      .then((data) => {
        setOutlets(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4 pb-24">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Daftar Outlet</h1>
        {/* Tombol Tambah Outlet (Jika perlu admin) */}
        <a href="/add-outlet" className="text-blue-600 text-sm font-bold">+ Baru</a>
      </div>

      {loading ? (
        // Tampilkan 3 skeleton saat loading
        [1, 2, 3].map((n) => <Skeleton key={n} className="h-24 w-full mb-3" />)
      ) : (
        outlets.map((outlet) => <OutletCard key={outlet.id} outlet={outlet} />)
      )}
    </div>
  );
}