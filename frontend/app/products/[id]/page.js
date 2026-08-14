import Link from 'next/link';
import { getProductById } from '../../../services/productService';
import AddToCartButton from "../../../components/AddToCartButton";

export default async function ProductDetailPage({ params }) {
  let product = null;
  let errorMessage = null;

  const { id } = await params;

  try {
    product = await getProductById(id);
  } catch (error) {
    errorMessage = "We couldn't find that product.";
  }

  if (errorMessage || !product) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        <p role="alert" className="mb-6 rounded-lg bg-red-50 px-4 py-4 text-red-700">
          {errorMessage || 'Product not found.'}
        </p>
        <Link href="/products" className="text-blue-600 hover:underline">
          &larr; Back to all products
        </Link>
      </main>
    );
  }

  return (
      <main className="mx-auto max-w-5xl px-6 py-10 bg-white text-zinc-900 min-h-screen">
      <Link
        href="/products"
        className="mb-6 inline-block text-sm text-blue-600 hover:underline"
      >
        &larr; Back to all products
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-lg bg-zinc-100">
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
            {product.category}
          </p>
          <h1 className="mb-3 text-3xl font-bold text-zinc-900">
            {product.name}
          </h1>
          <p className="mb-3 text-2xl font-bold text-zinc-900">
            ${Number(product.price).toFixed(2)}
          </p>

          <p
            className={
              product.availability
                ? 'mb-5 font-semibold text-green-700'
                : 'mb-5 font-semibold text-red-700'
            }
          >
            {product.availability ? 'In Stock' : 'Out of Stock'}
          </p>

          <p className="mb-8 leading-relaxed text-zinc-700">
            {product.description}
          </p>

          <AddToCartButton product={product} />
        </div>
      </div>
    </main>
  );
}