import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../config"; // Import supabase yang baru kita buat

export default function LoginUser() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);

    try {
      // 🔍 CEK KE DATABASE
      const { data, error } = await supabase
        .from('orders') // Nama tabel sesuai gambar Anda
        .select('user_name') // Nama kolom sesuai gambar Anda
        .eq('user_name', name) // 👈 KUNCI: Case Sensitive Check
        .limit(1);

      if (error) throw error;

      // Jika data ditemukan (artinya nama persis sama ada di database)
      if (data && data.length > 0) {
        localStorage.setItem("user_name", name);
        localStorage.setItem("role", "user");
        
        // Trigger event agar Navbar/UI lain update
        window.dispatchEvent(new Event("storage"));
        
        navigate("/");
      } else {
        alert(`Nama "${name}" tidak ditemukan! Pastikan huruf besar/kecil sesuai (misal: "Baihaqi").`);
      }

    } catch (error) {
      console.error("Login Error:", error);
      alert("Terjadi kesalahan koneksi database.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col justify-center p-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Login Mahasiswa</h1>
          <p className="text-gray-500 text-sm">Masuk sesuai nama di nota laundry</p>
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
              disabled={loading}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full text-white p-3 rounded-xl font-bold transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Mengecek..." : "Masuk Sekarang"}
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