import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

export default function CreateOrder() {
  const navigate = useNavigate();
  const [outlets, setOutlets] = useState([]);
  const [formData, setFormData] = useState({
    outlet_id: "",
    berat: "", // Asumsi input berat manual, atau dikosongkan dulu
    catatan: ""
  });

  // Load data outlet untuk dropdown
  useEffect(() => {
    fetch(`${API_BASE_URL}/outlets`)
      .then(res => res.json())
      .then(data => setOutlets(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Sesuaikan body dengan struktur database API Anda
        body: JSON.stringify({
          outlet_id: formData.outlet_id,
          status: "Menunggu Pickup",
          tanggal_masuk: new Date().toISOString().split('T')[0] 
        }),
      });

      if (res.ok) {
        alert("Kurir akan segera menjemput!");
        navigate("/orders");
      } else {
        alert("Gagal membuat pesanan");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-6">Buat Pesanan Baru</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Pilih Laundry</label>
          <select 
            className="w-full border p-2 rounded-lg bg-white"
            onChange={(e) => setFormData({...formData, outlet_id: e.target.value})}
            required
          >
            <option value="">-- Pilih Outlet --</option>
            {outlets.map(o => (
              <option key={o.id} value={o.id}>{o.nama}</option>
            ))}
          </select>
        </div>

        <div>
           <label className="block text-sm font-medium mb-1">Catatan (Alamat Pickup)</label>
           <textarea 
             className="w-full border p-2 rounded-lg"
             placeholder="Tolong jemput di kost nomor 10..."
             onChange={(e) => setFormData({...formData, catatan: e.target.value})}
           />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">
          Pesan Sekarang
        </button>
      </form>
    </div>
  );
}