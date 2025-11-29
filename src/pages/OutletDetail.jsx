import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

export default function OutletDetail() {
  const { id } = useParams();
  const [outlet, setOutlet] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/outlets/${id}`)
      .then((res) => res.json())
      .then((data) => setOutlet(data));
  }, [id]);

  if (!outlet) return <p className="p-4">Loading data outlet...</p>;

  return (
    <div className="p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="h-32 bg-blue-600 flex items-center justify-center">
            <span className="text-white text-4xl">🏪</span>
        </div>
        <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-800">{outlet.nama}</h1>
            <p className="text-gray-500 mt-1">{outlet.alamat}</p>
            <p className="text-green-600 font-bold mt-2">Buka • 08:00 - 21:00</p>
            
            <hr className="my-4"/>
            
            <h3 className="font-bold mb-2">Layanan Tersedia:</h3>
            <ul className="list-disc list-inside text-gray-600">
                <li>Cuci Kering</li>
                <li>Cuci Basah</li>
                <li>Setrika Uap</li>
            </ul>

            <a href={`https://wa.me/?text=Halo ${outlet.nama}, saya mau laundry`} className="block text-center bg-green-500 text-white font-bold py-3 rounded-xl mt-6">
                Chat WhatsApp
            </a>
        </div>
      </div>
    </div>
  );
}