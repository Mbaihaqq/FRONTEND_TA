import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/orders`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders([]);
          console.error("Data error:", data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Gagal mengambil data. Cek koneksi.");
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status) => {
    const s = status ? status.toLowerCase() : "";
    if (s.includes('selesai')) return 'bg-green-100 text-green-700';
    if (s.includes('pickup')) return 'bg-yellow-100 text-yellow-700';
    return 'bg-blue-100 text-blue-700';
  }

  return (
    <div className="p-4 pb-20">
      <h1 className="text-xl font-bold mb-4">Riwayat Pesanan</h1>

      {loading && <p className="text-center text-gray-500">Memuat data...</p>}
      {error && <p className="text-center text-red-500 bg-red-50 p-2 rounded">{error}</p>}

      {!loading && orders.length === 0 && !error && (
        <div className="text-center mt-10 opacity-60">
            <span className="text-4xl">📭</span>
            <p className="mt-2">Belum ada pesanan aktif.</p>
        </div>
      )}

      {orders.map((order) => (
        <Link key={order.id} to={`/order/${order.id}`}>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-3 hover:shadow-md transition">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-gray-800">Order #{order.id.substring(0,6)}</h3>
                    <p className="text-xs text-gray-500">{order.outlet_name || 'Outlet'}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${getStatusColor(order.status)}`}>
                    {order.status}
                </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}