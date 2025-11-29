import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginUser() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem("user_name", name);
      localStorage.setItem("role", "user");
      
      
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col justify-center p-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Login Mahasiswa 👋</h1>
          <p className="text-gray-500 text-sm">Masuk untuk cek status laundry</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input 
              type="text" 
              placeholder="Contoh: Baihaqi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700 transition">
            Masuk Sekarang
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">
            Apakah Anda Admin? <a href="/admin-login" className="text-blue-600 font-bold">Login di sini</a>
          </p>
        </div>
      </div>
    </div>
  );
}