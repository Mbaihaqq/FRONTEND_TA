import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API_BASE_URL } from "../config";

export default function CreateOrder() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preSelectedOutlet = searchParams.get("outletId");

  const [outlets, setOutlets] = useState([]);
  const [formData, setFormData] = useState({
    outlet_id: preSelectedOutlet || "",
    user_name: "Baihaqi", // Bisa diganti input
    weight: "",
    price: 0,
    status: "Menunggu Pickup"
  });

  // Load Outlet untuk Dropdown
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
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Order Berhasil Dibuat!");
        navigate("/orders");
      } else {
        alert("Gagal membuat order");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 pb-20">
      <h1 className="text-xl font-bold mb-6">Buat Pesanan</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Pilih Outlet */}
        <div>
          <label className="block text-sm font-bold mb-1">Pilih Laundry</label>
          <select 
            className="w-full border p-2 rounded-lg bg-white"
            value={formData.outlet_id}
            onChange={(e) => setFormData({...formData, outlet_id: e.target.value})}
            required
          >
            <option value="">-- Pilih --</option>
            {outlets.map(o => (
              <option key={o.id} value={o.id}>{o.name}</option>
            ))}
          </select>
        </div>

        {/* Berat */}
        <div>
           <label className="block text-sm font-bold mb-1">Estimasi Berat (Kg)</label>
           <input 
             type="number"
             className="w-full border p-2 rounded-lg"
             onChange={(e) => setFormData({
               ...formData, 
               weight: e.target.value,
               price: e.target.value * 5000 // Contoh logika harga otomatis
             })}
           />
        </div>

        {/* Harga (Otomatis) */}
        <div className="bg-gray-100 p-3 rounded-lg flex justify-between">
           <span>Estimasi Harga:</span>
           <span className="font-bold text-green-600">Rp {formData.price}</span>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">
          Kirim Pesanan
        </button>
      </form>
    </div>
  );
}