import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config"; 

export default function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Mahasiswa");
  const [latestOrder, setLatestOrder] = useState(null); 

  const getStatusColorClass = (status) => {
    const s = status ? status.toLowerCase() : "";
    if (s.includes("menunggu")) return "text-yellow-600 bg-yellow-100";
    if (s.includes("sedang") || s.includes("jemput")) return "text-orange-600 bg-orange-100";
    if (s.includes("proses")) return "text-blue-600 bg-blue-100";
    if (s.includes("selesai")) return "text-green-600 bg-green-100";
    return "text-gray-600 bg-gray-100";
  };

  useEffect(() => {
    const name = localStorage.getItem("user_name");
    const role = localStorage.getItem("role");

    if (!name || role !== "user") {
      navigate("/login");
    } else {
      setUsername(name);
      fetchLatestOrder(name); 
    }
  }, []);

  const fetchLatestOrder = (currentUserName) => {
    fetch(`${API_BASE_URL}/orders`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const myOrders = data.filter(
            (order) => order.user_name && order.user_name.toLowerCase() === currentUserName.toLowerCase()
          );
          
          const sortedOrders = myOrders.sort((a, b) => new Date(b.pickup_date) - new Date(a.pickup_date));
          
          if (sortedOrders.length > 0) {
            setLatestOrder(sortedOrders[0]);
          }
        }
      })
      .catch((err) => console.error("Gagal ambil aktivitas:", err));
  };

  return (
    // md:pb-10 artinya padding bawah dikurangi di desktop karena tidak ada navbar bawah
    <div className="min-h-screen bg-gray-50 pb-32 md:pb-10">
      
      {/* 1. Header Section */}
      {/* md:static md:bg-transparent: Di desktop header tidak sticky dan background transparan */}
      <div className="px-6 pt-8 pb-4 flex justify-between items-center bg-white sticky top-0 z-10 shadow-sm md:static md:bg-transparent md:shadow-none md:pt-10">
        <div>
          <p className="text-xs text-gray-400 font-medium mb-1">Selamat Datang,</p>
          <h1 className="text-xl font-bold text-gray-800">{username}! 👋</h1>
        </div>
        <Link to="/about" className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow-sm hover:shadow-md transition">
          <img 
            src={`https://api.dicebear.com/7.x/fun-emoji/svg?seed=${username}`} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </Link>
      </div>

      <div className="p-6">
        
        {/* 2. Hero Card / Banner */}
        {/* md:p-10: Padding lebih besar di desktop agar lega */}
        <div className="relative bg-blue-600 rounded-3xl p-6 md:p-10 text-white shadow-xl shadow-blue-200 overflow-hidden mb-8 transition hover:shadow-blue-300">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400 opacity-20 rounded-full blur-xl"></div>
          <div className="relative z-10">
            <h2 className="text-xl md:text-3xl font-bold mb-2">Cucian Numpuk?</h2>
            <p className="text-blue-100 text-sm md:text-base mb-6 max-w-[80%]">Jangan biarkan tugas kuliah terganggu. Biar kami yang cuci!</p>
            <Link to="/create-order" className="bg-white text-blue-600 text-xs md:text-sm font-bold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition transform hover:scale-105 inline-block">
              Order Sekarang
            </Link>
          </div>
        </div>

        {/* 3. Layanan Utama */}
        <h2 className="font-bold text-gray-800 text-lg mb-4 pl-1">Layanan Utama</h2>
        
        {/* GRID RESPONSIF: md:grid-cols-4 artinya jadi 4 kolom di desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <Link to="/create-order" className="group bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center justify-center border border-gray-100">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            </div>
            <span className="font-semibold text-gray-700 text-sm group-hover:text-blue-600">Laundry Baru</span>
          </Link>

          <Link to="/orders" className="group bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center justify-center border border-gray-100">
            <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-3 group-hover:bg-orange-500 group-hover:text-white transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
            </div>
            <span className="font-semibold text-gray-700 text-sm group-hover:text-orange-500">Lacak Status</span>
          </Link>

          <Link to="/outlets" className="group bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center justify-center border border-gray-100">
            <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center mb-3 group-hover:bg-purple-500 group-hover:text-white transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <span className="font-semibold text-gray-700 text-sm group-hover:text-purple-500">Cari Outlet</span>
          </Link>

          <Link to="/about" className="group bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center justify-center border border-gray-100">
            <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-500 group-hover:text-white transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <span className="font-semibold text-gray-700 text-sm group-hover:text-green-500">Profil Saya</span>
          </Link>
        </div>

        {/* 4. Aktivitas Terkini */}
        <div className="mt-8">
           <div className="flex justify-between items-center mb-4 pl-1">
             <h2 className="font-bold text-gray-800 text-lg">Aktivitas Terkini</h2>
             <Link to="/orders" className="text-blue-600 text-xs font-semibold hover:underline">Lihat Semua</Link>
           </div>
           
           {latestOrder ? (
             <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 animate-fade-in hover:shadow-md transition">
               <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${getStatusColorClass(latestOrder.status)}`}>
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               </div>
               <div className="flex-1">
                 <div className="flex justify-between items-center">
                    <h3 className="font-bold text-gray-800 text-sm">{latestOrder.status}</h3>
                    <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full text-gray-500">
                        {new Date(latestOrder.pickup_date).toLocaleDateString("id-ID", { day: 'numeric', month: 'short' })}
                    </span>
                 </div>
                 <p className="text-gray-500 text-xs mt-0.5">Order #{latestOrder.id.slice(0,6)}</p>
               </div>
             </div>
           ) : (
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <p className="text-gray-400 text-sm">Belum ada aktivitas.</p>
                <Link to="/create-order" className="text-blue-600 text-xs font-bold mt-2 inline-block hover:underline">Mulai Laundry</Link>
             </div>
           )}
        </div>

      </div>
    </div>
  );
}