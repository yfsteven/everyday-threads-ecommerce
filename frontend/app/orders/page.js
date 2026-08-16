"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function OrdersPage() {
  const router = useRouter();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("authToken");

      if (!token || token === "guest") {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/orders/my-orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load orders.");
        }

        setOrders(data.orders || []);
      } catch (err) {
        console.error("Error loading orders:", err);
        setError(err.message || "Unable to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-50 p-8 dark:bg-black">
        <div className="mx-auto max-w-4xl">
          <p className="text-zinc-600 dark:text-zinc-400">
            Loading your orders...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-zinc-50 p-8 dark:bg-black">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-white">
            My Orders
          </h1>

          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>

          <button
            onClick={() => router.push("/products")}
            className="mt-6 rounded-lg bg-black px-5 py-3 text-white hover:bg-zinc-800"
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 p-8 dark:bg-black">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              My Orders
            </h1>

            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              View your previous orders and their status.
            </p>
          </div>

          <button
            onClick={() => router.push("/products")}
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Continue Shopping
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200 bg-white p-10 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              No orders yet
            </h2>

            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              You haven't placed any orders yet.
            </p>

            <button
              onClick={() => router.push("/products")}
              className="mt-6 rounded-lg bg-black px-5 py-3 text-white hover:bg-zinc-800"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Order #{order.id}
                    </p>

                    <h2 className="mt-1 text-lg font-semibold text-zinc-900 dark:text-white">
                      ${Number(order.totalPrice).toFixed(2)}
                    </h2>

                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium capitalize text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      {order.orderStatus}
                    </span>

                    <button
                      onClick={() => router.push(`/orders/${order.id}`)}
                      className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}