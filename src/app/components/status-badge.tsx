/**
 * Status Badge Component
 * Displays a color-coded badge for job status with Material-UI
 */

"use client";

import { JobStatus } from "@/types/job";
import { Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventIcon from "@mui/icons-material/Event";
import CancelIcon from "@mui/icons-material/Cancel";

interface StatusBadgeProps {
  status: JobStatus;
  onClick?: () => void;
}

export function StatusBadge({ status, onClick }: StatusBadgeProps) {
  const getStatusConfig = (status: JobStatus) => {
    switch (status) {
      case "Applied":
        return {
          icon: <CheckCircleIcon />,
          label: "Applied",
          backgroundColor: "#dbeafe",
          color: "#0284c7",
          borderColor: "#0ea5e9",
        };
      case "Interview":
        return {
          icon: <EventIcon />,
          label: "Interview",
          backgroundColor: "#fef3c7",
          color: "#d97706",
          borderColor: "#fbbf24",
        };
      case "Rejected":
        return {
          icon: <CancelIcon />,
          label: "Rejected",
          backgroundColor: "#fee2e2",
          color: "#dc2626",
          borderColor: "#f87171",
        };
      default:
        return {
          icon: undefined,
          label: status,
          backgroundColor: "#e2e8f0",
          color: "#64748b",
          borderColor: "#cbd5e1",
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Chip
      icon={config.icon}
      label={config.label}
      onClick={onClick}
      sx={{
        fontWeight: 600,
        fontSize: "0.875rem",
        py: 2.5,
        px: 1.5,
        backgroundColor: config.backgroundColor,
        color: config.color,
        border: `1.5px solid ${config.borderColor}`,
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.3s ease",
        "& .MuiChip-icon": {
          color: config.color,
        },
        "&:hover": onClick
          ? {
              transform: "scale(1.08)",
              boxShadow: `0 8px 16px ${config.backgroundColor}`,
              backgroundColor: config.backgroundColor,
            }
          : {},
      }}
    />
  );
}
