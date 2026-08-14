"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartLink() {
  const { cartCount } = useCart();

  return (
    <Link
      href="/cart"
      className="relative flex items-center gap-2 rounded px-3 py-2 transition-colors hover:bg-zinc-800"
      aria-label={`Shopping cart with ${cartCount} items`}
    >
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="20" r="1" />
          <circle cx="19" cy="20" r="1" />
          <path d="M3 4h2l2.4 10.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 7H6" />
        </svg>

        {cartCount > 0 && (
          <span className="absolute -right-2 -top-2 flex min-w-5 h-5 items-center justify-center rounded-full bg-orange-500 px-1 text-xs font-bold text-white">
            {cartCount}
          </span>
        )}
      </div>

      <span className="font-medium">Cart</span>
    </Link>
  );
}