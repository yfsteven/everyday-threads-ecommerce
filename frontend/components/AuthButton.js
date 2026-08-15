"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthButton() {
  const router = useRouter();
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);

  const syncAuthState = () => {
    const token = localStorage.getItem("authToken");
    setIsLoggedInUser(Boolean(token) && token !== "guest");
  };

  useEffect(() => {
    syncAuthState();

    const onStorage = () => syncAuthState();
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const handleClick = () => {
    if (isLoggedInUser) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("currentUser");
      setIsLoggedInUser(false);
      router.push("/login");
      return;
    }

    router.push("/login");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded px-3 py-2 font-medium transition-colors hover:bg-zinc-800"
    >
      {isLoggedInUser ? "Logout" : "Login"}
    </button>
  );
}
