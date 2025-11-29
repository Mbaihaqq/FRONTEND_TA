import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Import Halaman
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import CreateOrder from "./pages/CreateOrder";
import Outlets from "./pages/Outlets";
import About from "./pages/About";
import Admin from "./pages/Admin";
import OrderDetail from "./pages/OrderDetail";

// Import Login
import LoginUser from "./pages/LoginUser";
import LoginAdmin from "./pages/LoginAdmin";

// Import Navigasi
import BottomNav from "./components/BottomNav";
import Sidebar from "./components/Sidebar"; // <--- Import Sidebar Baru

// --- LAYOUT CONTROLLER ---
function Layout({ children }) {
  const location = useLocation();
  
  // Halaman yang tidak butuh navigasi sama sekali (Login)
  const isLoginPage = ["/login", "/admin-login"].includes(location.pathname);

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      
      {/* 1. SIDEBAR (Hanya muncul di Desktop 'md:block', sembunyi di Mobile 'hidden') */}
      {!isLoginPage && <Sidebar />}

      {/* 2. KONTEN UTAMA */}
      {/* md:ml-64 artinya: di desktop, geser konten ke kanan 64 unit (karena ada sidebar) */}
      <main className={`flex-1 w-full ${!isLoginPage ? 'md:ml-64' : ''}`}>
        
        {/* Container Pembatas Lebar (Agar konten tidak terlalu lebar di layar raksasa) */}
        <div className="max-w-4xl mx-auto min-h-screen relative">
          {children}
        </div>

        {/* 3. BOTTOM NAV (Hanya muncul di Mobile, sembunyi di Desktop 'md:hidden') */}
        {!isLoginPage && (
          <div className="md:hidden">
            <BottomNav />
          </div>
        )}
      </main>

    </div>
  );
}

function App() {
  return (
    <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<LoginUser />} />
            <Route path="/admin-login" element={<LoginAdmin />} />
            
            <Route path="/" element={<Home />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/create-order" element={<CreateOrder />} />
            <Route path="/outlets" element={<Outlets />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/order/:id" element={<OrderDetail />} />
          </Routes>
        </Layout>
    </Router>
  );
}

export default App;