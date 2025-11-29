import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config"; // <--- INI PENTING

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
  console.log("Fetching ke:", `${API_BASE_URL}/orders`);

  fetch(`${API_BASE_URL}/orders`)
    .then(async (res) => {
      // 1. Ambil responsenya sebagai TEXT dulu (bukan JSON)
      const text = await res.text();
      console.log("RESPONSE ASLI DARI BACKEND:", text); // <--- LIHAT INI DI CONSOLE

      // 2. Cek apakah statusnya error?
      if (!res.ok) {
        throw new Error(`Server Error: ${res.status} - ${text}`);
      }

      // 3. Coba ubah text jadi JSON manual
      try {
        return JSON.parse(text);
      } catch (e) {
        throw new Error("Backend mengirim HTML, bukan JSON. Cek URL API.");
      }
    })
    .then((data) => {
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
        console.error("Data bukan array:", data);
      }
      setLoading(false);
    })
    .catch((err) => {
      console.error("FETCH ERROR:", err);
      setErrorMsg(err.message); // Tampilkan pesan error di layar HP
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