import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block overflow-hidden rounded-lg border border-zinc-200 bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-square bg-zinc-100">
        <img
          src={product.image_url}
          alt={product.name}
          className="h-full w-full object-cover"
        />
        {!product.availability && (
          <span className="absolute right-3 top-3 rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-white">
            Out of Stock
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-500">
          {product.category}
        </p>
        <h3 className="mb-1 font-semibold text-zinc-900">{product.name}</h3>
        <p className="font-bold text-zinc-900">
          ${Number(product.price).toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
