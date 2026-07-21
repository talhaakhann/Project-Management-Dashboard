"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hook";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, isLoggedIn } = useAppSelector(
    (state) => state.auth
  );

  const router = useRouter();

  useEffect(() => {
    if (!loading && isLoggedIn) {
      router.replace("/dashboard");
    }
  }, [loading, isLoggedIn]);

  if (loading) {
    return null; // or a small spinner
  }

  if (isLoggedIn) {
    return null;
  }

  return <>{children}</>;
}