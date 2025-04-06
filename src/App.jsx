import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./index.css";
import Home from './pages/Home';
import Product from './pages/Product';
import { useState, useEffect } from 'react';
import Cart from './pages/Cart';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast'; 

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    let updated = false;
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        updated = true;
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });


    setTimeout(() => {
      toast.success(updated ? 'Increased quantity!' : 'Added to cart!');
    }, 0);
  };


  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const removedItem = prevCart.find((item) => item.id === productId);
      setTimeout(() => {
        if (removedItem) {
          toast('Removed from cart', { icon: '🗑' });
        }
      }, 0);
      return prevCart.filter((item) => item.id !== productId);
    });
  };
    

  return (
    <Router>
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
      
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

        </nav>

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/product" element={<Product addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart} removeFromCart={removeFromCart} />} />

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
