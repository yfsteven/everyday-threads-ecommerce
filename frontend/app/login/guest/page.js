"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GuestPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("authToken", "guest");
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ id: "guest", email: "guest", role: "guest" })
    );
    router.replace("/products");
  }, [router]);

  return null;
}
