"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrder = sessionStorage.getItem("lastOrder");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  if (!order) {
    return (
      <main className="min-h-screen bg-zinc-50 px-6 py-10">
        <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow">
          <h1 className="text-3xl font-bold text-zinc-900">Order confirmation</h1>
          <p className="mt-4 text-zinc-700">
            No recent order was found.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-block rounded-md bg-black px-4 py-3 font-medium text-white hover:bg-zinc-800"
          >
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-zinc-900">Order confirmed</h1>
        <p className="mt-3 text-zinc-700">
          Your order was created successfully.
        </p>

        <div className="mt-8 space-y-3 rounded-md border border-zinc-200 p-4">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Email:</strong> {order.customerEmail}</p>
          <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
          <p><strong>Status:</strong> {order.orderStatus}</p>
          <p><strong>Total:</strong> ${Number(order.totalPrice).toFixed(2)}</p>
          <p><strong>Created:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-zinc-900">Items</h2>
          <ul className="mt-4 space-y-3">
            {order.items?.map((item, index) => (
              <li key={`${item.productId}-${index}`} className="rounded-md border border-zinc-200 p-4">
                <p><strong>Product ID:</strong> {item.productId}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/products"
          className="mt-8 inline-block rounded-md bg-black px-4 py-3 font-medium text-white hover:bg-zinc-800"
        >
          Continue shopping
        </Link>
      </div>
    </main>
  );
}
