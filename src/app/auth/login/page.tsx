/**
 * Login Page
 * Google Sign-In authentication only
 */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  Paper,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Container,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

export default function LoginPage() {
  const { signInWithGoogle, user, loading } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <CircularProgress sx={{ color: "white" }} />
      </Box>
    );
  }

  const handleGoogleSignIn = async () => {
    setError("");
    setIsLoading(true);

    try {
      await signInWithGoogle();
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Google sign-in failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          {/* Branding Section */}
          <Box sx={{ textAlign: "center", color: "white", pt: 4 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: "2.5rem", sm: "3rem" },
              }}
            >
              👔 JobTracker
            </Typography>
            <Typography
              variant="h6"
              sx={{
                opacity: 0.95,
                fontWeight: 300,
                fontSize: "1.1rem",
              }}
            >
              Track your job applications with ease
            </Typography>
          </Box>

          {/* Login Card */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: "20px",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              width: "100%",
              maxWidth: 400,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 1,
                textAlign: "center",
                color: "#1a1a1a",
              }}
            >
              Sign In
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: "#666",
                mb: 4,
                fontWeight: 500,
              }}
            >
              Sign in with your Google account
            </Typography>

            {/* Error Alert */}
            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  borderRadius: "12px",
                  backgroundColor: "rgba(255, 71, 87, 0.1)",
                  border: "1px solid #ff4757",
                  color: "#ff4757",
                }}
              >
                {error}
              </Alert>
            )}

            {/* Google Sign In Button */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              sx={{
                py: 1.8,
                fontWeight: 700,
                fontSize: "1.05rem",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                textTransform: "none",
                borderRadius: "12px",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5568d3 0%, #6a3f94 100%)",
                  boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
                },
                "&:disabled": {
                  background: "#ccc",
                  color: "white",
                },
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Sign In with Google"
              )}
            </Button>
          </Paper>

          {/* Footer */}
          <Box sx={{ textAlign: "center", color: "rgba(255, 255, 255, 0.8)" }}>
            <Typography variant="caption" sx={{ fontSize: "0.9rem" }}>
              Secure authentication powered by Google and Firebase
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
