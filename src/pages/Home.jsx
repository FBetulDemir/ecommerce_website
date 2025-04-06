import { useState } from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../hooks/UseProducts';
import ProductCard from '../components/ProductCard';
import heroVideo from '../assets/hero.mp4';
import { motion } from 'framer-motion';

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
      <section className="py-16 px-4 text-center bg-[#f8f8f8]">
        <h2 className="text-3xl font-semibold mb-12">Shop by Category</h2>

        {[...new Set(products.map((product) => product.category))].map((category, index) => {
          const previewProducts = products
            .filter((product) => product.category === category)
            .slice(0, 3); // Only 3 per section

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              
              <div className="flex justify-between items-center max-w-6xl mx-auto px-2 mb-6">
                <h3 className="text-xl font-semibold capitalize">{category}</h3>
                <Link
                  to={`/product?category=${encodeURIComponent(category)}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  View All →
                </Link>
              </div>

              {/* Product preview cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {previewProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ scale: 1.03 }}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition-all p-4 text-center"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-48 object-contain mx-auto mb-4"
                    />
                    <h4 className="text-sm font-semibold line-clamp-2">{product.title}</h4>
                    <p className="text-gray-500 mt-1">${product.price}</p>
                    <Link
                      to={`/product/${product.id}`}
                      className="inline-block mt-2 text-sm bg-[#2e2e2e] text-white px-4 py-2 rounded-full hover:bg-black transition"
                    >
                      View Product
                    </Link>

                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
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