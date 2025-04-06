import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./index.css";
import Home from './pages/Home';
import Product from './pages/Product';
import { useState, useEffect } from 'react';
import Cart from './pages/Cart';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast'; 
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import ProductDetails from './pages/ProductDetails';


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
        <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              
              {/* Brand */}
              <Link to="/" className="text-2xl font-bold text-gray-800 tracking-tight">
                Designish
              </Link>

              {/* Navigation Links */}
              <div className="hidden sm:flex gap-6 text-sm font-medium items-center">
                <Link to="/" className="text-gray-600 hover:text-black transition">Home</Link>
                <Link to="/product" className="text-gray-600 hover:text-black transition">Product</Link>
              </div>

              {/* Cart */}
              <div className="relative">
                <Link to="/cart">
                  <ShoppingCartIcon className="h-6 w-6 text-gray-700 hover:text-black transition" />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                      {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </nav>


        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/product" element={<Product addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
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
