import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config"; // Pastikan path ini benar

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [updatingId, setUpdatingId] = useState(null); // Untuk loading spinner saat update

  // 1. FUNGSI FETCH DATA (Logika Debugging Anda tetap dipakai)
  const fetchOrders = () => {
    setLoading(true);
    console.log("Fetching ke:", `${API_BASE_URL}/orders`);

    fetch(`${API_BASE_URL}/orders`)
      .then(async (res) => {
        const text = await res.text();
        // console.log("RESPONSE ASLI:", text); // Uncomment jika ingin debug

        if (!res.ok) {
          throw new Error(`Server Error: ${res.status} - ${text}`);
        }

        try {
          return JSON.parse(text);
        } catch (e) {
          throw new Error("Backend mengirim HTML, bukan JSON. Cek URL API.");
        }
      })
      .then((data) => {
        if (Array.isArray(data)) {
          // Sort agar order terbaru muncul di atas
          const sorted = data.sort((a, b) => new Date(b.pickup_date) - new Date(a.pickup_date));
          setOrders(sorted);
        } else {
          setOrders([]);
          console.error("Data bukan array:", data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err);
        setErrorMsg(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 2. FUNGSI UPDATE STATUS (Logika Baru)
  const handleUpdateStatus = async (id, newStatus) => {
    setUpdatingId(id); // Nyalakan loading di kartu spesifik
    
    try {
      const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
        method: "PUT", // Method PUT untuk update
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Gagal update status");

      // Jika sukses, update state lokal langsung (biar cepat/snappy)
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
      
      alert(`Status berhasil diubah ke: ${newStatus}`);

    } catch (error) {
      alert("Gagal mengubah status: " + error.message);
    } finally {
      setUpdatingId(null); // Matikan loading
    }
  };

  // Helper warna badge status
  const getStatusColor = (status) => {
    switch (status) {
      case "Menunggu Pickup": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Sedang Dijemput": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Proses Pencucian": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Selesai": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Daftar Pesanan</h1>
        <p className="text-sm text-gray-500">Kelola status laundry di sini</p>
      </div>

      {/* State: Loading & Error */}
      {loading && <div className="text-center py-10">Loading data...</div>}
      {errorMsg && <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-4">{errorMsg}</div>}

      {/* List Orders */}
      <div className="space-y-4">
        {!loading && orders.length === 0 && <p>Belum ada pesanan.</p>}

        {orders.map((order) => (
          <div key={order.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative">
            
            {/* Bagian Atas: Info User */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{order.user_name || "User"}</h3>
                <Link to={`/order/${order.id}`} className="text-xs text-blue-500 hover:underline">
                  #{order.id.slice(0, 8)}... (Lihat Detail)
                </Link>
              </div>
              <div className={`px-2 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(order.status)}`}>
                {order.status}
              </div>
            </div>

            {/* Bagian Tengah: Info Laundry */}
            <div className="bg-gray-50 p-3 rounded-xl text-sm text-gray-600 mb-4">
              <div className="flex justify-between">
                <span>Berat:</span> <span className="font-medium">{order.weight} Kg</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Total:</span> <span className="font-bold text-blue-600">Rp {parseInt(order.price).toLocaleString()}</span>
              </div>
            </div>

            {/* Bagian Bawah: DROPDOWN UBAH STATUS */}
            <div className="pt-3 border-t border-gray-100">
              <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Ubah Status:</label>
              <div className="flex items-center gap-2">
                <select
                  value={order.status}
                  disabled={updatingId === order.id}
                  onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                  className="w-full bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                >
                  <option value="Menunggu Pickup">Menunggu Pickup</option>
                  <option value="Sedang Dijemput">Sedang Dijemput</option>
                  <option value="Proses Pencucian">Proses Pencucian</option>
                  <option value="Selesai">Selesai</option>
                </select>
                
                {/* Loading Spinner Kecil saat update */}
                {updatingId === order.id && (
                  <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}