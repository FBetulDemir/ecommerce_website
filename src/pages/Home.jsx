import { useState } from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../hooks/UseProducts';
import ProductCard from '../components/ProductCard';
import heroVideo from '../assets/hero.mp4';

const Home = ({addToCart}) => {
  const { products, loading } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('All');

 
  const categories = ['All', ...new Set(products.map((product) => product.category))];


  const filteredProducts =
  selectedCategory === 'All'
    ? [] 
    : products
        .filter((product) => product.category === selectedCategory)
        .slice(0, 4);


  return (
    <div className="bg-[#f8f8f8] text-[#2e2e2e]">
      {/* Main header */}
      <section className="relative h-[80vh] flex items-center justify-center flex-wrap">
        <video
            autoPlay
            loop
            muted
            src={heroVideo}
            className="absolute w-full h-full object-cover opacity-90"
        />
        <div className="absolute left-5 w-[50%] z-5 p-4">
            <h1 className="text-4xl md:text-6xl font-serif mb-4 text-white">
                Timeless Style. Minimal Effort.
            </h1>
            <Link
                to="/product"
                className="inline-block mt-4 px-6 py-3 bg-white text-[#2e2e2e] font-medium rounded-full shadow hover:shadow-lg transition"
            >
                Shop Collection
            </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4 text-center">
        <h2 className="text-2xl font-semibold mb-8">Shop by Category</h2>
        <div className="flex justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category
                  ? 'bg-[#2e2e2e] text-white'
                  : 'bg-white text-[#2e2e2e] border'
              } transition`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition">
              <Link to={`/product?category=${product.category}`} className="block">
                <img src={product.image} alt={product.title} className="h-48 object-contain mx-auto mb-4" />
                <h3 className="text-sm font-semibold line-clamp-2">{product.category}</h3>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-12 px-4">
        <h2 className="text-2xl font-semibold text-center mb-8">Bestsellers</h2>
        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;