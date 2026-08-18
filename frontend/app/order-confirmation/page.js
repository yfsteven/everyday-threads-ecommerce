"use client";

export default function OrderConfirmationPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 text-center shadow">
        <h1 className="mb-4 text-3xl font-bold text-zinc-900">
          Order Confirmed!
        </h1>

        <p className="mb-6 text-zinc-600">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        <a
          href="/orders"
          className="inline-block rounded-md bg-black px-6 py-3 text-white"
        >
          View My Orders
        </a>
      </div>
    </main>
  );
}