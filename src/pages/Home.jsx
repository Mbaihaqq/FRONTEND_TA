import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-4 bg-blue-50 h-screen">
      <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-lg mb-6">
        <h1 className="text-2xl font-bold">Halo, Mahasiswa! 👋</h1>
        <p className="opacity-90">Cucian numpuk? Ayo laundry sekarang.</p>
      </div>

      <h2 className="font-bold text-lg mb-3">Menu Cepat</h2>
      <div className="grid grid-cols-2 gap-4">
        <Link to="/create-order" className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center justify-center hover:bg-blue-50 transition">
          <span className="text-3xl mb-2">🧺</span>
          <span className="font-bold text-gray-700">Laundry Baru</span>
        </Link>
        <Link to="/orders" className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center justify-center hover:bg-blue-50 transition">
          <span className="text-3xl mb-2">🚚</span>
          <span className="font-bold text-gray-700">Lacak Cucian</span>
        </Link>
        <Link to="/outlets" className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center justify-center hover:bg-blue-50 transition">
          <span className="text-3xl mb-2">🏪</span>
          <span className="font-bold text-gray-700">Cari Outlet</span>
        </Link>
        <Link to="/about" className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center justify-center hover:bg-blue-50 transition">
          <span className="text-3xl mb-2">👤</span>
          <span className="font-bold text-gray-700">Profil Saya</span>
        </Link>
      </div>
    </div>
  );
}