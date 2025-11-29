import { Link } from "react-router-dom";

export default function OrderCard({ order }) {

  const getStatusColor = (status) => {
    switch(status) {
      case 'Selesai': return 'bg-green-100 text-green-800';
      case 'Di-pickup': return 'bg-yellow-100 text-yellow-800';
      case 'Dicuci': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link to={`/order/${order.id}`} className="block">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-3 hover:shadow-md transition">
        <div className="flex justify-between mb-2">
          <span className="font-bold text-gray-700">Order #{order.id}</span>
          <span className={`text-xs px-2 py-1 rounded-full font-bold ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
        </div>
        <p className="text-sm text-gray-600">Outlet: {order.outlet_name || 'Laundry Umum'}</p>
      </div>
    </Link>
  );
}