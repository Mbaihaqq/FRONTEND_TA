import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { API_BASE_URL } from "../config";

export default function Admin() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    finish_date: "",
    status: ""
  });

  
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      alert("Akses Ditolak! Anda bukan Admin.");
      navigate("/admin-login");
    } else {
      fetchOrders(); 
    }
  }, []);

  const fetchOrders = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/orders`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setOrders(data.sort((a, b) => new Date(b.pickup_date) - new Date(a.pickup_date)));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const formatDateForInput = (isoString) => {
    if (!isoString) return "";
    return new Date(isoString).toISOString().split('T')[0];
  };

  const formatDateDisplay = (isoString) => {
    if (!isoString) return "-";
    return new Date(isoString).toLocaleDateString("id-ID", {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  const handleEdit = (order) => {
    setEditingId(order.id);
    setFormData({
      finish_date: formatDateForInput(order.finish_date),
      status: order.status
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Data berhasil diperbarui!");
        setEditingId(null);
        fetchOrders();
      } else {
        alert("Gagal update.");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin MENGHAPUS pesanan ini? Data tidak bisa dikembalikan.");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Pesanan berhasil dihapus.");
        fetchOrders();
      } else {
        alert("Gagal menghapus pesanan.");
      }
    } catch (error) {
      alert("Error koneksi: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 p-4">
      
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Panel Admin 🛠️</h1>
          <p className="text-xs text-gray-500">Kelola & Hapus Pesanan</p>
        </div>
        <button onClick={fetchOrders} className="text-xs bg-blue-100 text-blue-600 px-3 py-2 rounded-lg font-bold hover:bg-blue-200">
          Refresh
        </button>
      </div>

      {loading && <p className="text-center text-gray-400 mt-10">Memuat data...</p>}

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            
            {editingId === order.id ? (
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-bold text-gray-800">Edit Data</span>
                  <span className="text-xs text-gray-400">ID: {order.id.slice(0,4)}</span>
                </div>
                <div>
                  <label className="text-xs font-bold text-blue-600 block mb-1">Estimasi Selesai:</label>
                  <input 
                    type="date" 
                    name="finish_date"
                    value={formData.finish_date} 
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-yellow-600 block mb-1">Status Laundry:</label>
                  <select 
                    name="status" 
                    value={formData.status} 
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2 text-sm bg-white"
                  >
                    <option value="Menunggu Pickup">Menunggu Pickup</option>
                    <option value="Sedang Dijemput">Sedang Dijemput</option>
                    <option value="Proses Pencucian">Proses Pencucian</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </div>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => handleSave(order.id)} className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-bold shadow-md hover:bg-green-700">Simpan</button>
                  <button onClick={() => setEditingId(null)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-bold hover:bg-gray-300">Batal</button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{order.user_name || "User"}</h3>
                    <p className="text-[10px] text-gray-400">ID: {order.id.slice(0, 8)}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold border ${order.status === 'Selesai' ? 'bg-green-50 text-green-700 border-green-200' : order.status === 'Proses Pencucian' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg text-sm mb-4">
                  <div className="text-center">
                    <p className="text-[10px] text-gray-400">Masuk</p>
                    <p className="font-medium text-gray-700">{formatDateDisplay(order.pickup_date)}</p>
                  </div>
                  <div className="text-gray-300">➜</div>
                  <div className="text-center">
                    <p className="text-[10px] text-gray-400">Estimasi</p>
                    <p className={`font-medium ${order.finish_date ? 'text-blue-600' : 'text-gray-400 italic'}`}>
                      {formatDateDisplay(order.finish_date)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => handleEdit(order)} className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg text-sm font-bold hover:bg-blue-50 transition flex justify-center items-center gap-2"><span>✏️</span> Ubah Data</button>
                  <button onClick={() => handleDelete(order.id)} className="w-12 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-100 transition" title="Hapus Pesanan">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}