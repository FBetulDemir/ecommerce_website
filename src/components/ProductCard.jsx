const ProductCard = ({ product, addToCart }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition text-center">
        <h3 className="text-sm font-semibold line-clamp-2">{product.category}</h3>
        <img src={product.image} alt={product.title} className="h-48 object-contain mx-auto mb-4" />
        <h3 className="text-sm font-semibold line-clamp-2">{product.title}</h3>
        <p className="text-gray-600 mt-2">${product.price}</p>
        <button
          onClick={() => addToCart(product)}
          className="bg-[#2e2e2e] text-white px-4 py-2 rounded-full hover:bg-black transition mt-4"
        >
          Add to Cart
        </button>
      </div>
    );
  };
  
  export default ProductCard;