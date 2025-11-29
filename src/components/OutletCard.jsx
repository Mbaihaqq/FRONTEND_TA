import { Link } from "react-router-dom";

export default function OutletCard({ outlet }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center mb-3">
      <div>
        <h3 className="font-bold text-lg text-blue-900">{outlet.nama}</h3>
        <p className="text-gray-500 text-sm">{outlet.alamat}</p>
      </div>
      <Link 
        to={`/outlet/${outlet.id}`} 
        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700"
      >
        Detail
      </Link>
    </div>
  );
}