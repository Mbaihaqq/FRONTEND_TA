import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config"; 

export default function Outlets() {
  const [outlets, setOutlets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/outlets`) 
      .then((res) => res.json())
      .then((data) => {
        setOutlets(data);
        setLoading(false);
      })
      .catch((err) => console.error("Gagal ambil outlet:", err));
  }, []);

  if (loading) return <div className="p-4 text-center">Loading Outlets...</div>;

  return (
    <div className="p-4 pb-20">
      <h1 className="text-2xl font-bold mb-4">Mitra Laundry</h1>
      {outlets.map((outlet) => (
        <div key={outlet.id} className="bg-white p-4 rounded-xl shadow-sm border mb-3 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg text-blue-900">{outlet.name}</h3>
            <p className="text-gray-500 text-sm">{outlet.address}</p>
          </div>
          <Link to={`/create-order?outletId=${outlet.id}`} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
            Pilih
          </Link>
        </div>
      ))}
    </div>
  );
}