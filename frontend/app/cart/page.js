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
            <main className="max-w-6xl mx-auto w-full px-6 py-12">
                <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

                <div className="rounded-xl border border-zinc-700 p-10 text-center">
                    <h2 className="text-2xl font-semibold mb-3">Your cart is empty</h2>

                    <p className="text-zinc-400 mb-6">
                        Looks like you haven&apos;t added anything yet.
                    </p>

                    <Link
                        href="/products"
                        className="inline-block rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="max-w-6xl mx-auto w-full px-6 py-12">
            <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

            <div className="space-y-6">
                {cartItems.map((item) => (
                    <div
                        key={item.id}
                        className="border border-zinc-700 p-6 rounded-xl transition-all hover:border-zinc-500 hover:shadow-lg"
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

            <div className="mt-10 flex flex-col items-start gap-5 border-t border-zinc-700 pt-6">
                <h2 className="text-3xl font-bold">
                    Total: ${cartTotal.toFixed(2)}
                </h2>
                <Link
                    href="/checkout"
                    className="inline-block rounded-md bg-blue-600 px-7 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                >
                    Proceed to Checkout
                </Link>
            </div>
        </main>
    );
}