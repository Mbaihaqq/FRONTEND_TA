import { Link, useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  const username = localStorage.getItem("user_name") || "User";

  const handleLogout = () => {
    localStorage.removeItem("user_name");
    localStorage.removeItem("role");
    
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-20 p-6 pb-24">
      
      <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-4 border-white mb-4">
        <img 
          src={`https://api.dicebear.com/7.x/fun-emoji/svg?seed=${username}`}
          alt="Profile" 
          className="w-full h-full object-cover"
        />
      </div>

      <h1 className="text-2xl font-bold text-gray-800">{username}</h1>
      <p className="text-gray-500 text-sm mb-8">Pengguna Aplikasi</p>

      <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <h2 className="font-bold text-gray-800 mb-2">Tentang Aplikasi</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Aplikasi Laundry Millenial adalah proyek Tugas Akhir Praktikum PPB untuk memudahkan tracking status cucian mahasiswa.
        </p>
        <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">Versi 1.0.0</p>
        </div>
      </div>

      <button 
        onClick={handleLogout}
        className="text-red-500 font-bold text-sm hover:underline mt-4 bg-red-50 px-6 py-2 rounded-full border border-red-100"
      >
        Keluar / Logout
      </button>

    </div>
  );
}