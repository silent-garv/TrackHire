/**
 * Job Form Component
 * Client component for adding new jobs with Material-UI styling
 * Saves jobs to Firestore with user email and name
 */

"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/lib/auth-context";
import { addJobToFirestore } from "@/lib/firestore-service";
import { JobStatus } from "@/types/job";
import { useTheme } from "@mui/material/styles";
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Box,
  Alert,
  MenuItem,
  Grid,
  CircularProgress,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export function JobForm() {
  const { user, loading: authLoading } = useAuth();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    if (!user) {
      setError("You must be logged in to add a job");
      return;
    }

    setError(null);
    setSuccess(false);
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const companyName = formData.get("companyName") as string;
      const role = formData.get("role") as string;
      const status = formData.get("status") as JobStatus;

      await addJobToFirestore(user.uid, {
        companyName,
        role,
        status,
        appliedAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
        userId: user.uid,
        userEmail: user.email || "",
        userName: user.displayName || user.email?.split("@")[0] || "User",
      });

      setSuccess(true);
      formRef.current?.reset();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  if (authLoading) {
    return (
      <Card sx={{ mb: 6 }} elevation={3}>
        <CardContent sx={{ py: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        mb: { xs: 4, sm: 5, md: 6 },
        background: isDarkMode ? "#1e293b" : "#ffffff",
        border: isDarkMode ? "1px solid #334155" : "1px solid #e2e8f0",
        borderRadius: "16px",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: isDarkMode
            ? "0 20px 40px rgba(129, 140, 248, 0.15)"
            : "0 20px 40px rgba(99, 102, 241, 0.1)",
          borderColor: isDarkMode ? "#475569" : "#cbd5e1",
        },
      }}
      elevation={0}
    >
      <CardHeader
        avatar={
          <Box
            sx={{
              width: { xs: 48, sm: 56 },
              height: { xs: 48, sm: 56 },
              borderRadius: "12px",
              background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 700,
              fontSize: { xs: "1.5rem", sm: "1.8rem" },
            }}
          >
            📝
          </Box>
        }
        title={
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "1.1rem", sm: "1.3rem" }, color: isDarkMode ? "#e2e8f0" : "#1e293b" }}>
            New Application
          </Typography>
        }
        subheader={
          <Typography variant="caption" sx={{ color: isDarkMode ? "#94a3b8" : "#64748b", fontSize: "0.85rem" }}>
            {user?.email || "Loading..."}
          </Typography>
        }
        sx={{ pb: 1 }}
      />
      <CardContent sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 } }}>
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: "12px",
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              "& .MuiAlert-icon": {
                color: "#dc2626",
              },
            }}
          >
            {error}
          </Alert>
        )}
        {success && (
          <Alert
            severity="success"
            icon={<CheckCircleIcon />}
            sx={{
              mb: 3,
              borderRadius: "12px",
              backgroundColor: "#f0fdf4",
              border: "1px solid #86efac",
              "& .MuiAlert-icon": {
                color: "#22c55e",
              },
            }}
          >
            Application added successfully! 🎉
          </Alert>
        )}

        <form onSubmit={handleSubmit} ref={formRef}>
          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Company Name"
                name="companyName"
                placeholder="e.g., Google, Microsoft"
                variant="outlined"
                required
                disabled={isLoading}
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: isDarkMode ? "#0f172a" : "#f8fafc",
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Job Role"
                name="role"
                placeholder="e.g., Senior Software Engineer"
                variant="outlined"
                required
                disabled={isLoading}
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: isDarkMode ? "#0f172a" : "#f8fafc",
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                select
                label="Application Status"
                name="status"
                defaultValue="Applied"
                variant="outlined"
                disabled={isLoading}
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: isDarkMode ? "#0f172a" : "#f8fafc",
                  },
                }}
              >
                <MenuItem value="Applied">Applied</MenuItem>
                <MenuItem value="Interview">Interview</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={20} /> : <AddIcon />}
                sx={{
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                  borderRadius: "12px",
                  background: isDarkMode
                    ? "linear-gradient(135deg, #818cf8 0%, #6366f1 100%)"
                    : "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                  "&:hover": {
                    background: isDarkMode
                      ? "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)"
                      : "linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)",
                  },
                }}
              >
                {isLoading ? "Adding..." : "Add Application"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}
