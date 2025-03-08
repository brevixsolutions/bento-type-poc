"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useAuth } from "../context/AuthContext";
import { useCallback } from "react";

function LogoutButton() {
  const router = useRouter();
  const { clearOutUser } = useAuth();
  const handleLogout = useCallback(() => {
    clearOutUser();
    localStorage.clear();
    setTimeout(() => {
      router.push("/login");
    }, 0);
  }, [clearOutUser, router]);
  return <Button onClick={handleLogout}>Logout</Button>;
}

export default LogoutButton;
