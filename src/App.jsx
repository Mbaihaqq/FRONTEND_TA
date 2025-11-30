import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";


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
import Sidebar from "./components/Sidebar"; 


function Layout({ children }) {
  const location = useLocation();
  
  
  const isLoginPage = ["/login", "/admin-login"].includes(location.pathname);

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      
      
      {!isLoginPage && <Sidebar />}

      
      <main className={`flex-1 w-full ${!isLoginPage ? 'md:ml-64' : ''}`}>
        
        
        <div className="max-w-4xl mx-auto min-h-screen relative">
          {children}
        </div>

        
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