import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config"; // Pastikan path import ini benar

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/orders`)
      .then((res) => {
        // Cek jika response bukan OK (misal 404 atau 500)
        if (!res.ok) {
          throw new Error(`Gagal mengambil data (Status: ${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Response dari Backend:", data); // Cek console browser Anda

        // --- PENGAMAN UTAMA (ANTI CRASH) ---
        // Kita cek: Apakah data yang datang benar-benar Array (List)?
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          // Jika bukan array (misal object error), kita simpan errornya
          console.error("Data bukan array:", data);
          setOrders([]); // Set array kosong biar .map tidak error
          setErrorMsg(JSON.stringify(data)); // Tampilkan error di layar
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setErrorMsg(err.message);
        setLoading(false);
        setOrders([]); // Pastikan tetap array walau error
      });
  }, []);

  // Fungsi untuk warna status laundry
  const getStatusColor = (status) => {
    const s = status ? status.toLowerCase() : "";
    if (s.includes("selesai")) return "bg-green-100 text-green-800 border-green-200";
    if (s.includes("dicuci")) return "bg-blue-100 text-blue-800 border-blue-200";
    if (s.includes("pickup")) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="p-4 pb-24 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Riwayat Pesanan</h1>
        <Link 
          to="/create-order" 
          className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-semibold shadow hover:bg-blue-700 transition"
        >
          + Baru
        </Link>
      </div>

      {/* 1. TAMPILAN LOADING */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-xl animate-pulse"></div>
          ))}
          <p className="text-center text-gray-500 text-sm">Sedang memuat data...</p>
        </div>
      )}

      {/* 2. TAMPILAN ERROR (Jika ada) */}
      {!loading && errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-4">
          <p className="font-bold">Terjadi Kesalahan:</p>
          <p className="text-sm mt-1">{errorMsg}</p>
          <p className="text-xs text-gray-500 mt-2">Cek Console (F12) untuk detail.</p>
        </div>
      )}

      {/* 3. TAMPILAN KOSONG */}
      {!loading && !errorMsg && orders.length === 0 && (
        <div className="text-center py-10">
          <p className="text-6xl mb-4">🧺</p>
          <h3 className="text-lg font-bold text-gray-700">Belum ada pesanan</h3>
          <p className="text-gray-500 text-sm mb-6">Cucian Anda masih kosong.</p>
          <Link to="/create-order" className="text-blue-600 font-bold hover:underline">
            Buat pesanan sekarang
          </Link>
        </div>
      )}

      {/* 4. TAMPILAN LIST DATA (Aman karena sudah dipastikan Array) */}
      <div className="space-y-3">
        {orders.map((order) => (
          <Link key={order.id} to={`/order/${order.id}`} className="block group">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 group-hover:shadow-md transition duration-200">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs text-gray-400 block mb-1">
                    Order ID: #{order.id ? order.id.slice(0, 8) : "..."}
                  </span>
                  <h3 className="font-bold text-gray-800 text-lg">
                    {order.outlet_name || "Outlet Tidak Diketahui"}
                  </h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                  {order.status || "Proses"}
                </span>
              </div>
              
              <div className="flex justify-between items-end mt-4">
                <div className="text-sm text-gray-500">
                  <p>📅 {order.pickup_date ? new Date(order.pickup_date).toLocaleDateString("id-ID") : "-"}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Total Harga</p>
                  <p className="font-bold text-blue-600">
                    {order.price ? `Rp ${parseInt(order.price).toLocaleString("id-ID")}` : "Menunggu Timbang"}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}