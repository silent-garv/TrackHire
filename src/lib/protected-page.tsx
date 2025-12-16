/**
 * Protected Page Component
 * Ensures only authenticated users can access protected routes
 */

"use client";

import { ReactNode } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CircularProgress, Box } from "@mui/material";

export function ProtectedPage({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Only render children if user is authenticated
  if (!user) {
    return null;
  }

  return <>{children}</>;
}
