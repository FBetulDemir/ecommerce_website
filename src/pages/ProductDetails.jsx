import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p className="p-4">Loading product...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img src={product.image} alt={product.title} className="w-full object-contain h-96" />
        <div>
          <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
          <p className="text-gray-500 text-sm mb-4">{product.category}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <p className="text-xl font-bold mb-6">${product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-[#2e2e2e] text-white px-6 py-2 rounded-full hover:bg-black transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
