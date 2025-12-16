"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/lib/auth-context";
import { onJobStatsSnapshot, JobStats } from "@/lib/firestore-service";
import { Paper, Box, Typography, CircularProgress, useTheme } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

interface StatCardProps {
  icon: React.ComponentType<any>;
  label: string;
  value: string | number;
  color: string;
}

function StatCard({ icon: Icon, label, value, color }: StatCardProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "16px",
        border: isDarkMode ? "1px solid #334155" : "1px solid #e2e8f0",
        backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: isDarkMode
            ? "0 12px 24px rgba(129, 140, 248, 0.1)"
            : "0 12px 24px rgba(79, 70, 229, 0.1)",
          transform: "translateY(-4px)",
          borderColor: isDarkMode ? "#475569" : "#cbd5e1",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "12px",
            background: isDarkMode
              ? `linear-gradient(135deg, ${color}30 0%, ${color}15 100%)`
              : `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: color,
            flexShrink: 0,
          }}
        >
          <Icon sx={{ fontSize: 28 }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? "#94a3b8" : "#64748b",
              fontWeight: 500,
              mb: 1,
            }}
          >
            {label}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: isDarkMode ? "#e2e8f0" : "#1e293b",
            }}
          >
            {value}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default function StatsCards() {
  const { user, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<JobStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  useEffect(() => {
    if (!authLoading && user) {
      setIsLoading(true);
      unsubscribeRef.current = onJobStatsSnapshot(
        user.uid,
        (newStats) => {
          setStats(newStats);
          setIsLoading(false);
        },
        (error) => {
          console.error("Error fetching stats:", error);
          setIsLoading(false);
        }
      );
    }

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [user, authLoading]);

  if (isLoading || !stats) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4, mb: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
        gap: 3,
        mb: 8,
      }}
    >
      <Box>
        <StatCard
          icon={WorkIcon}
          label="Total Applications"
          value={stats.total}
          color="#4f46e5"
        />
      </Box>
      <Box>
        <StatCard
          icon={PendingIcon}
          label="In Progress"
          value={stats.inProgress}
          color="#f59e0b"
        />
      </Box>
      <Box>
        <StatCard
          icon={CheckCircleIcon}
          label="Interviewed"
          value={stats.interviewed}
          color="#10b981"
        />
      </Box>
      <Box>
        <StatCard
          icon={TrendingUpIcon}
          label="Success Rate"
          value={`${stats.successRate}%`}
          color="#ec4899"
        />
      </Box>
    </Box>
  );
}
