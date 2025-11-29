import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600" : "text-gray-500 hover:bg-gray-50";

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white border-r border-gray-200 z-50">
      
      {/* Logo Area */}
      <div className="p-6 border-b border-gray-100 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
          L
        </div>
        <h1 className="text-xl font-bold text-gray-800">Laundry App</h1>
      </div>

      {/* Menu Links */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-1">
        
        <Link to="/" className={`flex items-center gap-3 px-6 py-3 transition ${isActive('/')}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          <span className="font-medium">Home</span>
        </Link>

        <Link to="/create-order" className={`flex items-center gap-3 px-6 py-3 transition ${isActive('/create-order')}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          <span className="font-medium">Buat Pesanan</span>
        </Link>

        <Link to="/orders" className={`flex items-center gap-3 px-6 py-3 transition ${isActive('/orders')}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
          <span className="font-medium">Riwayat Pesanan</span>
        </Link>

        <Link to="/outlets" className={`flex items-center gap-3 px-6 py-3 transition ${isActive('/outlets')}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          <span className="font-medium">Daftar Outlet</span>
        </Link>

        <Link to="/about" className={`flex items-center gap-3 px-6 py-3 transition ${isActive('/about')}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          <span className="font-medium">Profil Saya</span>
        </Link>

      </nav>

      {/* Footer Sidebar */}
      <div className="p-4 border-t border-gray-100">
        <p className="text-xs text-center text-gray-400">© 2025 Laundry Millenial</p>
      </div>
    </aside>
  );
}