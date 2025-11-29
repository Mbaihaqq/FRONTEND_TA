import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginAdmin() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (password === "admin123") {
      localStorage.setItem("role", "admin");
      navigate("/admin");
    } else {
      alert("Password Salah!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center p-6">
      
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-sm border-t-4 border-blue-500">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            🔒
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Panel Admin</h1>
          <p className="text-gray-500 text-sm mt-1">Masukkan password akses</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-gray-900 text-white p-3.5 rounded-xl font-bold hover:bg-black transition transform active:scale-95"
          >
            Masuk Panel
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-gray-100">
          <a href="/login" className="text-sm font-medium text-gray-500 hover:text-gray-900">
            ← Kembali ke Login User
          </a>
        </div>

      </div>
    </div>
  );
}