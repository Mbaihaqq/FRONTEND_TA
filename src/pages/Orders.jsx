import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { API_BASE_URL } from "../config"; 

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentUser, setCurrentUser] = useState(""); 

  
  useEffect(() => {
    const name = localStorage.getItem("user_name");
    const role = localStorage.getItem("role");

   
    if (!name || role !== "user") {
      navigate("/login");
    } else {
      setCurrentUser(name);
      fetchOrders(name); 
    }
  }, []);

  
  const fetchOrders = (loggedInName) => {
    setLoading(true);
    fetch(`${API_BASE_URL}/orders`)
      .then(async (res) => {
        const text = await res.text();
        if (!res.ok) throw new Error(text);
        try {
          return JSON.parse(text);
        } catch (e) {
          throw new Error("Format data backend bukan JSON.");
        }
      })
      .then((data) => {
        if (Array.isArray(data)) {
          
          
          const myOrders = data.filter((order) => 
            order.user_name && 
            order.user_name.toLowerCase() === loggedInName.toLowerCase()
          );

          
          const sortedData = myOrders.sort((a, b) => new Date(b.pickup_date) - new Date(a.pickup_date));
          
          setOrders(sortedData);
        } else {
          setOrders([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error Fetching Orders:", err);
        setErrorMsg("Gagal memuat data. Pastikan backend aktif.");
        setLoading(false);
      });
  };

  
  const safeDate = (dateString) => {
    if (!dateString) return "-"; 
    try {
      return new Date(dateString).toLocaleDateString("id-ID", {
        day: 'numeric', month: 'short'
      });
    } catch (e) {
      return "-";
    }
  };

  
  const safePrice = (price) => {
    if (!price) return "0";
    return parseInt(price).toLocaleString("id-ID");
  };

 
  const getStatusColor = (status) => {
    const s = status ? status.toLowerCase() : "";
    if (s.includes("menunggu")) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    if (s.includes("sedang")) return "bg-orange-100 text-orange-800 border-orange-200";
    if (s.includes("proses")) return "bg-blue-100 text-blue-800 border-blue-200";
    if (s.includes("selesai")) return "bg-green-100 text-green-800 border-green-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  if (loading) return <div className="p-8 text-center text-gray-500 pt-20">Memuat pesanan...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-24 p-4">
      
     
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-800">Riwayat Pesanan</h1>
        <p className="text-xs text-gray-500">
            Halo <span className="font-bold text-blue-600">{currentUser}</span>, ini daftar cucianmu.
        </p>
      </div>

      {errorMsg && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-4 border border-red-100 shadow-sm">
          ⚠️ {errorMsg}
        </div>
      )}

      
      {orders.length === 0 && !loading && !errorMsg && (
        <div className="text-center py-16 flex flex-col items-center">
          <div className="bg-gray-100 p-4 rounded-full mb-3">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          </div>
          <p className="text-gray-500 font-medium">Belum ada pesanan.</p>
          <p className="text-gray-400 text-xs mb-4">Cucian numpuk? Yuk order sekarang!</p>
          <Link to="/create-order" className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition">
            Buat Pesanan Baru
          </Link>
        </div>
      )}

      
      <div className="space-y-4">
        {orders.map((order) => (
          
          
          <Link to={`/order/${order.id}`} key={order.id} className="block">
            
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300">
              
              <div className="flex justify-between items-start mb-3 border-b border-gray-50 pb-2">
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{order.user_name}</h3>
                  <p className="text-[10px] text-gray-400 font-mono">
                    ID: #{order.id.substring(0, 8)}
                  </p>
                </div>
                
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(order.status)}`}>
                  {order.status || "Menunggu"}
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span className="text-gray-600 truncate">
                    {order.laundry_outlets?.name || "Lokasi outlet tidak tersedia"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <div className="flex flex-col">
                     <span className="text-xs text-gray-400">Estimasi Selesai:</span>
                     <span className={`font-semibold ${order.finish_date ? 'text-blue-600' : 'text-gray-400 italic'}`}>
                       {safeDate(order.finish_date)}
                     </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs text-gray-500">Total Biaya</span>
                <span className="text-lg font-bold text-gray-800">
                  Rp {safePrice(order.price)}
                </span>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}