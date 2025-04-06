const Cart = ({ cart, removeFromCart }) => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map((item) => (
            <div key={item.id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition text-center">
              <h3 className="text-sm font-semibold line-clamp-2">{item.category}</h3>
              <img src={item.image} alt={item.title} className="h-48 object-contain mx-auto mb-4" />
              <h3 className="text-sm font-semibold line-clamp-2">{item.title}</h3>
              <p className="text-gray-600 mt-2">${item.price}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition mt-4"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;