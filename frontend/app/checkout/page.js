"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    shippingAddress: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

 async function handleSubmit(event) {
  event.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerName: formData.customerName,
        email: formData.email,
        shippingAddress: formData.shippingAddress,
        items: [],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to create order");
    }

    console.log("Order created:", data);
  } catch (error) {
    console.error("Error creating order:", error);
  }
}

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold text-zinc-900">
          Checkout
        </h1>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg bg-white p-6 shadow"
        >
          <div className="space-y-6">
            <div>
              <label
                htmlFor="customerName"
                className="mb-2 block font-medium text-zinc-900"
              >
                Full Name
              </label>

              <input
                id="customerName"
                name="customerName"
                type="text"
                value={formData.customerName}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-zinc-300 px-4 py-2"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-medium text-zinc-900"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-zinc-300 px-4 py-2"
              />
            </div>

            <div>
              <label
                htmlFor="shippingAddress"
                className="mb-2 block font-medium text-zinc-900"
              >
                Shipping Address
              </label>

              <textarea
                id="shippingAddress"
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleChange}
                required
                rows={4}
                className="w-full rounded-md border border-zinc-300 px-4 py-2"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-black px-4 py-3 font-medium text-white hover:bg-zinc-800"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}