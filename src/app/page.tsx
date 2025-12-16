/**
 * Dashboard Page (Home)
 * Displays an overview of all job applications with the ability to add new ones
 * Protected route - requires authentication
 */

import { Suspense } from "react";
import { JobForm } from "./components/job-form";
import { JobsList } from "./components/jobs-list";
import StatsCards from "./components/stats-cards";
import Loading from "./loading";
import type { Metadata } from "next";
import { Box, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { ProtectedPage } from "@/lib/protected-page";

export const metadata: Metadata = {
  title: "Dashboard - JobTracker",
  description: "Manage all your job applications in one place",
};

function DashboardContent() {
  return (
    <Box>
      {/* Page Header */}
      <Box
        sx={{
          mb: 8,
          background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
          borderRadius: "20px",
          px: { xs: 3, sm: 4, md: 5 },
          py: { xs: 4, sm: 5, md: 6 },
          color: "white",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "-40%",
            right: "-20%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            zIndex: 0,
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <TrendingUpIcon sx={{ fontSize: "2.5rem" }} />
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                letterSpacing: "-1px",
              }}
            >
              Welcome Back!
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              opacity: 0.95,
              fontSize: "1.1rem",
              maxWidth: "600px",
            }}
          >
            Track your job applications, monitor progress, and land your dream role. Let's build your career together! 🚀
          </Typography>
        </Box>
      </Box>

      {/* Stats Section */}
      <Suspense fallback={<Loading />}>
        <StatsCards />
      </Suspense>

      {/* Job Form Component */}
      <Box sx={{ mb: 8 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 3,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              width: "4px",
              height: "28px",
              borderRadius: "2px",
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
            }}
          />
          Add New Application
        </Typography>
        <JobForm />
      </Box>

      {/* Jobs List Section */}
      <Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 3,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              width: "4px",
              height: "28px",
              borderRadius: "2px",
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
            }}
          />
          Your Applications
        </Typography>
        <Suspense fallback={<Loading />}>
          <JobsList />
        </Suspense>
      </Box>
    </Box>
  );
}

export default function Home() {
  return (
    <ProtectedPage>
      <DashboardContent />
    </ProtectedPage>
  );
}
