"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hook";
import { DashboardContentSkeleton } from "@/components/skeletons/dashboard-content-skeleton";

export default function DashboardGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, isLoggedIn } = useAppSelector(
    (state) => state.auth
  );

  const router = useRouter();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.replace("/sign-in");
    }
  }, [loading, isLoggedIn]);

  if (loading) {
    return <DashboardContentSkeleton />;
  }

  if (!isLoggedIn) {
    return null;
  }

  return <>{children}</>;
}