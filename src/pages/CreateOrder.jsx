import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

export default function CreateOrder() {
  const navigate = useNavigate();
  
  const [userName, setUserName] = useState(""); 
  const [outlets, setOutlets] = useState([]);
  const [selectedOutlet, setSelectedOutlet] = useState("");
  const [weight, setWeight] = useState(""); // Biarkan string agar bisa kosong
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const PRICE_PER_KG = 5000;

  // 1. Cek Login & Load Outlet
  useEffect(() => {
    const storedName = localStorage.getItem("user_name");
    const role = localStorage.getItem("role");

    if (!storedName || role !== "user") {
      alert("Silakan login terlebih dahulu.");
      navigate("/login");
    } else {
      setUserName(storedName);
    }

    fetch(`${API_BASE_URL}/outlets`)
      .then((res) => res.json())
      .then((data) => setOutlets(data))
      .catch((err) => console.error(err));
  }, []);

  // 2. Hitung Harga Real-time (Anti Minus di Tampilan)
  useEffect(() => {
    const w = parseFloat(weight);
    // Jika input valid dan lebih dari 0, hitung harga
    if (!isNaN(w) && w > 0) {
      setPrice(w * PRICE_PER_KG);
    } else {
      // Jika 0, minus, atau kosong, set harga jadi 0
      setPrice(0);
    }
  }, [weight]);

  // 3. FUNGSI SUBMIT (DIPERKETAT)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    
    // --- VALIDASI TAHAP 1: KELENGKAPAN DATA ---
    if (!selectedOutlet || !weight) {
      alert("Mohon lengkapi Outlet dan Berat cucian!");
      return;
    }

    // --- VALIDASI TAHAP 2: ANGKA NOL ATAU MINUS ---
    const weightValue = parseFloat(weight);

    // Cek jika: Tidak Angka (NaN) ATAU Kurang dari atau sama dengan 0
    if (isNaN(weightValue) || weightValue <= 0) {
      alert("⛔ ERROR: Berat cucian tidak valid! \nHarap masukkan angka lebih besar dari 0 (misal: 1, 2.5, dst).");
      setPrice(0); // Reset harga visual
      return; // <--- STOP DI SINI! JANGAN LANJUT KE BAWAH
    }

    // Jika lolos validasi, baru nyalakan loading
    setLoading(true);

    const newOrder = {
      user_name: userName,
      outlet_id: selectedOutlet,
      weight: weightValue,
      price: weightValue * PRICE_PER_KG, // Hitung ulang biar aman
      status: "Menunggu Pickup"
    };

    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });

      if (response.ok) {
        alert("✅ Pesanan BERHASIL dibuat!");
        navigate("/orders");
      } else {
        const errData = await response.json();
        alert("❌ Gagal: " + (errData.error || "Terjadi kesalahan server"));
      }
    } catch (error) {
      alert("❌ Error Koneksi: Pastikan internet lancar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24">
      <div className="flex items-center mb-6 pt-4">
        <button onClick={() => navigate(-1)} className="mr-3 p-2 bg-white rounded-full shadow-sm">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h1 className="text-xl font-bold text-gray-800">Buat Pesanan Baru</h1>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Nama Pemesan</label>
            <input 
              type="text" 
              value={userName} 
              disabled 
              className="w-full bg-gray-100 border border-gray-300 p-3 rounded-xl text-gray-600 font-bold"
            />
            <p className="text-[10px] text-gray-400 mt-1">*Sesuai akun yang login</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Pilih Outlet</label>
            <select 
              value={selectedOutlet}
              onChange={(e) => setSelectedOutlet(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">-- Pilih Lokasi Laundry --</option>
              {outlets.map((outlet) => (
                <option key={outlet.id} value={outlet.id}>
                  {outlet.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Perkiraan Berat (Kg)</label>
            <input 
              type="number" 
              placeholder="Min. 1 Kg"
              value={weight}
              // VALIDASI HTML: Mencegah input minus dari keyboard/tombol panah
              min="0.1" 
              step="0.1"
              onKeyDown={(e) => {
                // Mencegah ketik tanda minus (-) secara manual
                if(e.key === '-' || e.key === 'e') e.preventDefault();
              }}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
             {/* Feedback Visual Merah jika user memaksa input 0 */}
             {weight !== "" && parseFloat(weight) <= 0 && (
                <p className="text-xs text-red-600 mt-2 font-bold bg-red-50 p-2 rounded-lg border border-red-200">
                  ⚠️ Berat tidak valid! Masukkan angka positif.
                </p>
             )}
          </div>

          <div className="bg-blue-50 p-4 rounded-xl flex justify-between items-center border border-blue-100">
            <span className="text-sm text-blue-800 font-medium">Estimasi Biaya</span>
            <span className="text-xl font-bold text-blue-700">Rp {price.toLocaleString()}</span>
          </div>

          <button 
            type="submit" 
            // Matikan tombol jika loading ATAU berat <= 0
            disabled={loading || parseFloat(weight) <= 0}
            className={`w-full p-4 rounded-xl text-white font-bold shadow-lg transition transform active:scale-95 
              ${(loading || parseFloat(weight) <= 0) 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'}`}
          >
            {loading ? "Memproses..." : "Kirim Pesanan Sekarang 🚀"}
          </button>

        </form>
      </div>
    </div>
  );
}