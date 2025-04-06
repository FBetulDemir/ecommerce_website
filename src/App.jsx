import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./index.css";
import Home from './pages/Home';
import Product from './pages/Product';
import { useState } from 'react';
import Cart from './pages/Cart';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="p-4 bg-gray-100 flex items-center justify-between">
          <div className="text-xl font-bold text-gray-800">
            <Link to="/">Designish</Link>
          </div>
          <div className="flex gap-4 items-center">
            <Link to="/" className="text-blue-600 hover:underline">Home</Link>
            <Link to="/product" className="text-blue-600 hover:underline">Product</Link>
            <Link to="/cart" className="text-blue-600 hover:underline">Cart ({cart.length})</Link>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Search
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/product" element={<Product addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center p-4">
          <p>© 2025 Designish. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2 text-sm">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Contact Us</a>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
