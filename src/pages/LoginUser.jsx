import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../config"; // Import koneksi database

export default function LoginUser() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);

    try {
      // 🔍 CEK KE DATABASE SUPABASE
      // Mencari apakah ada nama di tabel 'orders' kolom 'user_name'
      const { data, error } = await supabase
        .from('orders')          // Nama tabel
        .select('user_name')     // Nama kolom
        .eq('user_name', name)   // .eq() = Harus Sama Persis (Case Sensitive)
        .limit(1);

      if (error) throw error;

      // Jika data ditemukan
      if (data && data.length > 0) {
        // Simpan sesi login
        localStorage.setItem("user_name", name);
        localStorage.setItem("role", "user");
        
        // Pemicu agar Navbar berubah (opsional)
        window.dispatchEvent(new Event("storage"));
        
        navigate("/");
      } else {
        // Jika nama beda huruf besar/kecil atau tidak ada
        alert(`Gagal! Nama "${name}" tidak ditemukan. Pastikan huruf besar/kecil sesuai.`);
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan koneksi.");
    } finally {
      setLoading(false);
    }
  };

  // ... (Bagian return JSX / Tampilan form biarkan sama seperti sebelumnya)
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col justify-center p-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        {/* ... Header ... */}
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
            className={`w-full text-white p-3 rounded-xl font-bold transition ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "Mengecek..." : "Masuk Sekarang"}
          </button>
        </form>
        {/* ... Footer Link Admin ... */}
         <div className="mt-4 text-center">
            <p className="text-xs text-gray-400">
                Apakah Anda Admin? <a href="/admin-login" className="text-blue-600 font-bold">Login di sini</a>
            </p>
        </div>
      </div>
    </div>
  );
}