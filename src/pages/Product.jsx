import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useProducts from '../hooks/UseProducts';
import ProductCard from '../components/ProductCard';

const Product = ({ addToCart }) => {
  const { products, loading } = useProducts();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const urlCategory = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const categories = ['All', ...new Set(products.map((p) => p.category))];

  useEffect(() => {
    setSelectedCategory(urlCategory);
  }, [urlCategory]);

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="p-6 bg-[#f8f8f8] min-h-screen text-[#2e2e2e]">
      <h1 className="text-2xl font-bold text-center mb-8">Our Products</h1>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full transition border text-sm ${
              selectedCategory === category
                ? 'bg-[#2e2e2e] text-white'
                : 'bg-white text-[#2e2e2e]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products */}
      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;
