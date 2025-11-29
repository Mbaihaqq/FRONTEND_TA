import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config"; // <--- INI PENTING

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    // Menggunakan API_BASE_URL dari config
    fetch(`${API_BASE_URL}/orders`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg("Backend Error / Belum Deploy");
        setLoading(false);
      });
  }, []);

  // ... (Sisa kode return JSX tampilan Anda) ...
  // Gunakan kode Orders.jsx lengkap yang saya berikan di jawaban sebelumnya
  return (
      <div className="p-4">
          <h1 className="text-xl font-bold mb-4">Riwayat Pesanan</h1>
          {/* Tampilkan Loading / Error / List Data */}
          {loading && <p>Loading...</p>}
          {errorMsg && <p className="text-red-500">{errorMsg}</p>}
          
          {orders.map(order => (
              <Link key={order.id} to={`/order/${order.id}`}>
                  <div className="bg-white p-4 rounded shadow mb-2">
                      <p>Order #{order.id.slice(0,6)}</p>
                      <span className="text-blue-600 font-bold">{order.status}</span>
                  </div>
              </Link>
          ))}
      </div>
  )
}