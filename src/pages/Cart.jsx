import { Link } from 'react-router-dom';

const Cart = ({ cart, setCart, removeFromCart }) => {
  const handleQuantityChange = (id, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta),
            }
          : item
      )
    );
  };

  const total = cart
    .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
    .toFixed(2);

  return (
    <div className="p-8 min-h-screen bg-[#f8f8f8] text-[#2e2e2e]">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>Your cart is empty.</p>
          <Link to="/product" className="text-blue-600 hover:underline block mt-4">
            ← Start Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition text-center"
              >
                <h3 className="text-sm font-semibold text-gray-400 mb-1">
                  {item.category}
                </h3>
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-48 object-contain mx-auto mb-4"
                />
                <h3 className="text-sm font-semibold line-clamp-2 mb-2">{item.title}</h3>

                {/* Quantity Controls */}
                <div className="flex justify-center items-center gap-4 mb-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="bg-gray-300 hover:bg-gray-400 text-sm rounded-full w-8 h-8"
                  >
                    −
                  </button>
                  <span className="text-base font-medium">{item.quantity || 1}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="bg-gray-300 hover:bg-gray-400 text-sm rounded-full w-8 h-8"
                  >
                    +
                  </button>
                </div>

                {/* Final Price */}
                <p className="text-gray-800 font-semibold mb-2">
                  ${ (item.price * (item.quantity || 1)).toFixed(2) }
                </p>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-end">
            <p className="text-xl font-semibold">Total: ${total}</p>
            <Link
              to="/product"
              className="mt-4 text-blue-600 hover:underline text-sm"
            >
              ← Continue Shopping
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
