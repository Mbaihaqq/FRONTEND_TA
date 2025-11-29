import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Import Halaman-halaman
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import CreateOrder from "./pages/CreateOrder";
import Outlets from "./pages/Outlets";
import About from "./pages/About";
import Admin from "./pages/Admin";
import OrderDetail from "./pages/OrderDetail"; 


import LoginUser from "./pages/LoginUser";
import LoginAdmin from "./pages/LoginAdmin";


import BottomNav from "./components/BottomNav";


function LayoutWithNav({ children }) {
  const location = useLocation();
  

  const hideNav = ["/login", "/admin-login"].includes(location.pathname);

  return (
    <>
      {children}
      {!hideNav && <BottomNav />}
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen font-sans">
        
        
        <LayoutWithNav>
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
        </LayoutWithNav>

      </div>
    </Router>
  );
}

export default App;