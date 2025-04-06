import useProducts from '../hooks/UseProducts';
import ProductCard from '../components/ProductCard';

const Product = () => {
  const { products, loading } = useProducts();

  if (loading) return <p className="p-4">Loading products...</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Product;
