"use client";

import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        cartTotal,
    } = useCart();

    if (cartItems.length === 0) {
        return (
            <main className="p-8">
                <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>

                <p className="mb-4">Your cart is empty.</p>

                <Link href="/products" className="underline">
                    Continue Shopping
                </Link>
            </main>
        );
    }

    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

            <div className="space-y-6">
                {cartItems.map((item) => (
                    <div
                        key={item.id}
                        className="border p-4 rounded-lg transition-shadow hover:shadow-lg"
                    >
                        <h2 className="text-xl font-semibold">{item.name}</h2>

                        <p>${item.price.toFixed(2)}</p>

                        <div className="flex items-center gap-3 mt-3">
                            <button
                                onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                }
                                className="border px-3 py-1 rounded transition-colors hover:bg-zinc-800 hover:text-white cursor-pointer"
                            >
                                -
                            </button>

                            <span>{item.quantity}</span>

                            <button
                                onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                }
                                className="border px-3 py-1 rounded transition-colors hover:bg-zinc-800 hover:text-white cursor-pointer"
                            >
                                +
                            </button>

                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="border p-2 rounded ml-4 transition-colors hover:bg-red-600 hover:text-white hover:border-red-600 cursor-pointer"
                                aria-label={`Remove ${item.name} from cart`}
                                title="Remove from cart"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M3 6h18" />
                                    <path d="M8 6V4h8v2" />
                                    <path d="M19 6l-1 14H6L5 6" />
                                    <path d="M10 11v5" />
                                    <path d="M14 11v5" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold">
                    Total: ${cartTotal.toFixed(2)}
                </h2>
            </div>
        </main>
    );
}