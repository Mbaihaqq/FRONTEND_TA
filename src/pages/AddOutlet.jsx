import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

export default function AddOutlet() {
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${API_BASE_URL}/outlets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama, alamat }),
    });
    alert("Outlet berhasil ditambahkan!");
    navigate("/outlets");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-6">Tambah Mitra Laundry</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
            className="w-full border p-3 rounded-lg" 
            placeholder="Nama Laundry" 
            onChange={e => setNama(e.target.value)} 
        />
        <input 
            className="w-full border p-3 rounded-lg" 
            placeholder="Alamat" 
            onChange={e => setAlamat(e.target.value)} 
        />
        <button className="w-full bg-green-600 text-white py-3 rounded-xl font-bold">Simpan</button>
      </form>
    </div>
  );
}