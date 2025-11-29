import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/orders/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data");
        return res.json();
      })
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

 
  const getStatusColor = (status) => {
    switch (status) {
      case "Selesai": return "bg-green-100 text-green-700 border-green-200";
      case "Dicuci": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Di-pickup": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default: return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Memuat detail pesanan...</div>;
  if (!order) return <div className="p-8 text-center text-red-500">Pesanan tidak ditemukan.</div>;

  return (
    <div className="p-4 pb-24 bg-gray-50 min-h-screen">
     
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-3 p-2 bg-white rounded-full shadow-sm">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h1 className="text-xl font-bold">Detail Pesanan</h1>
      </div>

      
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-4">
        <div className="flex justify-between items-start mb-4">
            <div>
                <p className="text-gray-500 text-sm">No. Order</p>
                <h2 className="text-2xl font-bold text-gray-800">#{order.id}</h2>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                {order.status}
            </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4 border-t pt-4">
            <div>
                <p className="text-gray-400 text-xs">Tanggal Masuk</p>
                <p className="font-semibold text-sm">{order.tanggal_masuk || "-"}</p>
            </div>
            <div>
                <p className="text-gray-400 text-xs">Estimasi Selesai</p>
                <p className="font-semibold text-sm">{order.tanggal_selesai || "Menunggu"}</p>
            </div>
        </div>
      </div>

    
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-4">
        <h3 className="font-bold text-gray-800 mb-3">Rincian Laundry</h3>
        <div className="space-y-3">
            <div className="flex justify-between text-sm">
                <span className="text-gray-500">Outlet</span>
                <span className="font-medium">{order.outlet_name || "Outlet Pusat"}</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-gray-500">Berat Cucian</span>
                <span className="font-medium">{order.berat ? `${order.berat} Kg` : "Belum ditimbang"}</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-gray-500">Layanan</span>
                <span className="font-medium">Cuci Komplit</span>
            </div>
            {order.catatan && (
                <div className="pt-2 border-t mt-2">
                    <p className="text-xs text-gray-400">Catatan:</p>
                    <p className="text-sm text-gray-600 italic">"{order.catatan}"</p>
                </div>
            )}
        </div>
      </div>

     
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4">Status Tracker</h3>
        <div className="relative pl-4 border-l-2 border-gray-200 space-y-6">
            
          
            <div className="relative">
                <div className={`absolute -left-[21px] w-4 h-4 rounded-full ${order.status ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                <h4 className="text-sm font-bold">Pesanan Dibuat</h4>
                <p className="text-xs text-gray-500">Pesanan telah diterima sistem.</p>
            </div>

          
            <div className="relative">
                <div className={`absolute -left-[21px] w-4 h-4 rounded-full ${(order.status === 'Di-pickup' || order.status === 'Dicuci' || order.status === 'Selesai') ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                <h4 className="text-sm font-bold">Dijemput Kurir</h4>
                <p className="text-xs text-gray-500">Kurir menuju lokasi Anda.</p>
            </div>

          
            <div className="relative">
                <div className={`absolute -left-[21px] w-4 h-4 rounded-full ${(order.status === 'Dicuci' || order.status === 'Selesai') ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                <h4 className="text-sm font-bold">Proses Pencucian</h4>
                <p className="text-xs text-gray-500">Pakaian sedang dicuci & setrika.</p>
            </div>

            
            <div className="relative">
                <div className={`absolute -left-[21px] w-4 h-4 rounded-full ${order.status === 'Selesai' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <h4 className="text-sm font-bold">Selesai</h4>
                <p className="text-xs text-gray-500">Laundry siap dikirim kembali.</p>
            </div>
        </div>
      </div>

     
      <div className="mt-6 text-center">
        <button className="text-blue-600 text-sm font-semibold hover:underline">
            Butuh bantuan dengan pesanan ini?
        </button>
      </div>
    </div>
  );
}