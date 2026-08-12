import ProductCard from '../../components/ProductCard';
import { getAllProducts } from '../../services/productService';

export default async function ProductsPage() {
  let products = [];
  let errorMessage = null;

  try {
    products = await getAllProducts();
  } catch (error) {
    errorMessage = "We couldn't load products right now. Please try again later.";
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold text-zinc-900">
        Shop All Products
      </h1>

      {errorMessage && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 px-4 py-6 text-center text-red-700"
        >
          {errorMessage}
        </p>
      )}

      {!errorMessage && products.length === 0 && (
        <p className="py-16 text-center text-zinc-500">
          No products are available right now. Check back soon!
        </p>
      )}

      {!errorMessage && products.length > 0 && (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
