import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Outlets from './pages/Outlets';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import CreateOrder from './pages/CreateOrder';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <div className="font-sans text-gray-800">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/outlets" element={<Outlets />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order/:id" element={<OrderDetail />} />
          <Route path="/create-order" element={<CreateOrder />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}

export default App;