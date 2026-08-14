"use client";

import { useCart } from "../context/CartContext";

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();

  return (
    <button
      type="button"
      disabled={!product.availability}
      onClick={() => addToCart(product)}
      className="w-full self-start rounded-md bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300 sm:w-auto"
    >
      {product.availability ? "Add to Cart" : "Unavailable"}
    </button>
  );
}