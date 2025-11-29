import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 pb-32"> {/* pb-32 untuk memberi ruang navbar bawah */}
      
      {/* 1. Header Section */}
      <div className="px-6 pt-8 pb-4 flex justify-between items-center bg-white sticky top-0 z-10 shadow-sm">
        <div>
          <p className="text-xs text-gray-400 font-medium mb-1">Selamat Datang,</p>
          <h1 className="text-xl font-bold text-gray-800">Mahasiswa! 👋</h1>
        </div>
        <Link to="/about" className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </Link>
      </div>

      <div className="p-6">
        
        {/* 2. Hero Card / Banner */}
        <div className="relative bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-200 overflow-hidden mb-8">
          {/* Hiasan Background (Lingkaran transparan) */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400 opacity-20 rounded-full blur-xl"></div>
          
          <div className="relative z-10">
            <span className="bg-blue-500 text-xs font-bold px-2 py-1 rounded-md mb-3 inline-block border border-blue-400">Status</span>
            <h2 className="text-xl font-bold mb-1">Cucian Numpuk?</h2>
            <p className="text-blue-100 text-sm mb-4 max-w-[80%]">Jangan biarkan tugas kuliah terganggu. Biar kami yang cuci!</p>
            <Link to="/create-order" className="bg-white text-blue-600 text-xs font-bold px-4 py-2 rounded-full shadow-md hover:bg-gray-100 transition">
              Order Sekarang
            </Link>
          </div>
        </div>

        {/* 3. Quick Actions Grid */}
        <h2 className="font-bold text-gray-800 text-lg mb-4 pl-1">Layanan Utama</h2>
        <div className="grid grid-cols-2 gap-4">
          
          {/* Tombol: Laundry Baru */}
          <Link to="/create-order" className="group bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center justify-center border border-gray-100">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            </div>
            <span className="font-semibold text-gray-700 text-sm group-hover:text-blue-600">Laundry Baru</span>
          </Link>

          {/* Tombol: Lacak Status */}
          <Link to="/orders" className="group bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center justify-center border border-gray-100">
            <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-3 group-hover:bg-orange-500 group-hover:text-white transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
            </div>
            <span className="font-semibold text-gray-700 text-sm group-hover:text-orange-500">Lacak Status</span>
          </Link>

          {/* Tombol: Cari Outlet */}
          <Link to="/outlets" className="group bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center justify-center border border-gray-100">
            <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center mb-3 group-hover:bg-purple-500 group-hover:text-white transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <span className="font-semibold text-gray-700 text-sm group-hover:text-purple-500">Cari Outlet</span>
          </Link>

          {/* Tombol: Profil */}
          <Link to="/about" className="group bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center justify-center border border-gray-100">
            <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-500 group-hover:text-white transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <span className="font-semibold text-gray-700 text-sm group-hover:text-green-500">Profil Saya</span>
          </Link>

        </div>

        {/* 4. Section Tambahan (Optional: Recent Activity Dummy) */}
        <div className="mt-8">
           <div className="flex justify-between items-center mb-4 pl-1">
             <h2 className="font-bold text-gray-800 text-lg">Aktivitas Terkini</h2>
             <Link to="/orders" className="text-blue-600 text-xs font-semibold">Lihat Semua</Link>
           </div>
           
           <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
             <div>
               <h3 className="font-bold text-gray-800 text-sm">Sedang Dicuci</h3>
               <p className="text-gray-500 text-xs">Order #ORD-2023001 • Hari ini</p>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}