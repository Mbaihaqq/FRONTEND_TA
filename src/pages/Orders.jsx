import { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
import Skeleton from "../components/Skeleton";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/orders`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 pb-24">
       <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Pesanan Saya</h1>
        <Link to="/create-order" className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">+ Order Baru</Link>
      </div>

      {loading ? (
         [1, 2, 3].map((n) => <Skeleton key={n} className="h-24 w-full mb-3" />)
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">Belum ada pesanan aktif.</p>
      ) : (
        orders.map((order) => <OrderCard key={order.id} order={order} />)
      )}
    </div>
  );
}