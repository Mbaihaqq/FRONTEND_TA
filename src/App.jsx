import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';

// Import Halaman
import Home from './pages/Home';
import Outlets from './pages/Outlets';
import OutletDetail from './pages/OutletDetail';
import AddOutlet from './pages/AddOutlet'; // Halaman baru
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import CreateOrder from './pages/CreateOrder'; // Halaman baru
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Outlet Routes */}
          <Route path="/outlets" element={<Outlets />} />
          <Route path="/outlet/:id" element={<OutletDetail />} />
          <Route path="/add-outlet" element={<AddOutlet />} />
          
          {/* Order Routes */}
          <Route path="/orders" element={<Orders />} />
          <Route path="/order/:id" element={<OrderDetail />} />
          <Route path="/create-order" element={<CreateOrder />} />
          
          <Route path="/about" element={<About />} />
        </Routes>

        {/* Bottom Nav selalu muncul di bawah */}
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}

export default App;