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


  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  
  const getStatusColor = (status) => {
    if (!status) return "bg-gray-100";
    const s = status.toLowerCase();
    if (s.includes("menunggu")) return "bg-yellow-100 text-yellow-700 border-yellow-200";
    if (s.includes("sedang") || s.includes("jemput")) return "bg-orange-100 text-orange-700 border-orange-200";
    if (s.includes("proses")) return "bg-blue-100 text-blue-700 border-blue-200";
    if (s.includes("selesai")) return "bg-green-100 text-green-700 border-green-200";
    return "bg-gray-100 text-gray-600";
  };

 
  const getProgressLevel = (status) => {
    if (!status) return 1;
    const s = status.toLowerCase();
    
    
    if (s.includes("selesai")) return 4;
    
   
    if (s.includes("proses") || s.includes("cuci")) return 3;
    
    
    if (s.includes("sedang") || s.includes("jemput")) return 2;
    
    
    return 1;
  };

  if (loading) return <div className="p-8 text-center text-gray-500 pt-20">Memuat detail...</div>;
  if (!order) return <div className="p-8 text-center text-red-500 pt-20">Pesanan tidak ditemukan.</div>;

  const progress = getProgressLevel(order.status);

  return (
    <div className="p-4 pb-24 bg-gray-50 min-h-screen">
      
     
      <div className="flex items-center mb-6 pt-4">
        <button onClick={() => navigate(-1)} className="mr-3 p-2 bg-white rounded-full shadow-sm">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h1 className="text-xl font-bold text-gray-800">Detail Pesanan</h1>
      </div>

      
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-4">
        <div className="flex justify-between items-start mb-4">
            <div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wide">No. Order</p>
                <h2 className="text-lg font-bold text-gray-800">#{order.id.substring(0,8)}</h2>
            </div>
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(order.status)}`}>
                {order.status}
            </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4 border-t border-gray-50 pt-4">
            <div>
                <p className="text-gray-400 text-xs">Tanggal Masuk</p>
                <p className="font-semibold text-sm text-gray-700">
                  {formatDate(order.pickup_date)}
                </p>
            </div>
            <div>
                <p className="text-gray-400 text-xs">Estimasi Selesai</p>
                <p className={`font-semibold text-sm ${order.finish_date ? 'text-blue-600' : 'text-gray-400 italic'}`}>
                  {order.finish_date ? formatDate(order.finish_date) : "Menunggu Admin"}
                </p>
            </div>
        </div>
      </div>

     
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-4">
        <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Rincian Laundry</h3>
        <div className="space-y-3">
            <div className="flex justify-between text-sm">
                <span className="text-gray-500">Outlet</span>
                
                <span className="font-medium text-gray-800 text-right w-1/2 truncate">
                  {order.laundry_outlets?.name || "Outlet Tidak Ditemukan"}
                </span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-gray-500">Berat Cucian</span>
                <span className="font-medium text-gray-800">
                  {order.weight ? `${order.weight} Kg` : "Belum ditimbang"}
                </span>
            </div>
            <div className="flex justify-between text-sm pt-2 mt-2 border-t border-dashed border-gray-200">
                <span className="text-gray-600 font-bold">Total Biaya</span>
                <span className="font-bold text-blue-600 text-lg">
                  Rp {parseInt(order.price || 0).toLocaleString("id-ID")}
                </span>
            </div>
        </div>
      </div>

      
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-6 text-sm uppercase tracking-wide">Status Tracker</h3>
        <div className="relative pl-4 border-l-2 border-gray-200 space-y-8">
            
           
            <div className="relative">
                <div className="absolute -left-[21px] w-4 h-4 rounded-full bg-blue-500 border-2 border-white ring-2 ring-blue-100"></div>
                <h4 className="text-sm font-bold text-gray-800">Pesanan Dibuat</h4>
                <p className="text-xs text-gray-500">Pesanan telah diterima sistem.</p>
            </div>

           
            <div className="relative">
                <div className={`absolute -left-[21px] w-4 h-4 rounded-full border-2 border-white ${progress >= 2 ? 'bg-blue-500 ring-2 ring-blue-100' : 'bg-gray-300'}`}></div>
                <h4 className={`text-sm font-bold ${progress >= 2 ? 'text-gray-800' : 'text-gray-400'}`}>Dijemput Kurir</h4>
                <p className="text-xs text-gray-500">Kurir menuju lokasi Anda.</p>
            </div>

          
            <div className="relative">
                <div className={`absolute -left-[21px] w-4 h-4 rounded-full border-2 border-white ${progress >= 3 ? 'bg-blue-500 ring-2 ring-blue-100' : 'bg-gray-300'}`}></div>
                <h4 className={`text-sm font-bold ${progress >= 3 ? 'text-gray-800' : 'text-gray-400'}`}>Proses Pencucian</h4>
                <p className="text-xs text-gray-500">Pakaian sedang dicuci & setrika.</p>
            </div>

            
            <div className="relative">
                <div className={`absolute -left-[21px] w-4 h-4 rounded-full border-2 border-white ${progress >= 4 ? 'bg-green-500 ring-2 ring-green-100' : 'bg-gray-300'}`}></div>
                <h4 className={`text-sm font-bold ${progress >= 4 ? 'text-gray-800' : 'text-gray-400'}`}>Selesai</h4>
                <p className="text-xs text-gray-500">Laundry siap dikirim kembali.</p>
            </div>
        </div>
      </div>

    </div>
  );
}