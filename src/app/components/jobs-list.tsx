/**
 * Job List Component
 * Client Component that fetches and displays all jobs from Firestore with Material-UI
 */

"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/lib/auth-context";
import { onUserJobsSnapshot, deleteJobFromFirestore, updateJobInFirestore } from "@/lib/firestore-service";
import { Job, JobStatus } from "@/types/job";
import { StatusBadge } from "./status-badge";
import { useTheme } from "@mui/material/styles";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Paper,
  CircularProgress,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  TextField,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export function JobsList() {
  const { user, loading: authLoading } = useAuth();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!authLoading && user) {
      setIsLoading(true);
      // Subscribe to real-time job updates
      unsubscribeRef.current = onUserJobsSnapshot(
        user.uid,
        (jobs) => {
          setJobs(jobs);
          setError(null);
          setIsLoading(false);
        },
        (err) => {
          setError(err.message);
          setIsLoading(false);
        }
      );
    }

    // Cleanup subscription on unmount or when user changes
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [user, authLoading]);

  const handleDelete = async () => {
    if (!jobToDelete) return;

    try {
      await deleteJobFromFirestore(jobToDelete);
      setJobs(jobs.filter((j) => j.id !== jobToDelete));
      setDeleteConfirmOpen(false);
      setJobToDelete(null);
    } catch (err: any) {
      setError(err.message || "Failed to delete job");
      console.error(err);
    }
  };

  const handleUpdateStatus = async (jobId: string, newStatus: JobStatus) => {
    try {
      await updateJobInFirestore(jobId, { status: newStatus });
      setJobs(
        jobs.map((j) =>
          j.id === jobId ? { ...j, status: newStatus } : j
        )
      );
    } catch (err: any) {
      setError(err.message || "Failed to update job status");
      console.error(err);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingJob) return;

    try {
      setIsSaving(true);
      await updateJobInFirestore(editingJob.id, {
        companyName: editingJob.companyName,
        role: editingJob.role,
        status: editingJob.status,
      });
      setJobs(
        jobs.map((j) =>
          j.id === editingJob.id ? editingJob : j
        )
      );
      setEditingJob(null);
    } catch (err: any) {
      setError(err.message || "Failed to update job");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ borderRadius: 2 }}>
        {error}
      </Alert>
    );
  }

  if (jobs.length === 0) {
    return (
      <Paper
        sx={{
          py: { xs: 6, sm: 8 },
          px: { xs: 3, sm: 4 },
          textAlign: "center",
          background: isDarkMode
            ? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
            : "linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)",
          borderRadius: "16px",
          border: isDarkMode ? "2px dashed #475569" : "2px dashed #cbd5e1",
        }}
        elevation={0}
      >
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: isDarkMode ? "#e2e8f0" : "#1e293b", fontSize: { xs: "1.3rem", sm: "1.6rem" } }}>
            📋 No Applications Yet
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: isDarkMode ? "#94a3b8" : "#64748b", fontSize: { xs: "0.95rem", sm: "1rem" } }}>
          Start your job search journey by adding your first application above!
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {jobs.map((job) => (
        <Grid size={{ xs: 12 }} key={job.id}>
          <Card
            sx={{
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              cursor: "pointer",
              border: isDarkMode ? "1px solid #334155" : "1px solid #e2e8f0",
              borderRadius: "16px",
              backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
              "&:hover": {
                boxShadow: isDarkMode
                  ? "0 20px 40px rgba(129, 140, 248, 0.15)"
                  : "0 20px 40px rgba(99, 102, 241, 0.15)",
                transform: "translateY(-6px)",
                borderColor: isDarkMode ? "#475569" : "#cbd5e1",
              },
            }}
          >
            <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", sm: "flex-start" },
                  gap: { xs: 2, sm: 3 },
                }}
              >
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  {/* Company Name with Icon */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 }, mb: 3, flexWrap: "wrap" }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        flexShrink: 0,
                      }}
                    >
                      <BusinessIcon sx={{ fontSize: "1.5rem" }} />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: isDarkMode ? "#e2e8f0" : "#1e293b",
                        fontSize: { xs: "1.1rem", sm: "1.4rem" },
                        minWidth: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {job.companyName}
                    </Typography>
                  </Box>

                  {/* Job Role with Icon */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5, minWidth: 0 }}>
                    <WorkIcon
                      sx={{
                        color: "#ec4899",
                        fontSize: "1.2rem",
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: isDarkMode ? "#94a3b8" : "#64748b",
                        fontWeight: 500,
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                        minWidth: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {job.role}
                    </Typography>
                  </Box>

                  {/* User Info */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2, minWidth: 0, flexWrap: "wrap" }}>
                    <PersonIcon
                      sx={{
                        color: "#3b82f6",
                        fontSize: "1rem",
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        color: isDarkMode ? "#cbd5e1" : "#94a3b8",
                        fontWeight: 500,
                        fontSize: "0.75rem",
                        minWidth: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {job.userName}
                    </Typography>
                  </Box>

                  {/* Applied Date with Icon */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
                    <DateRangeIcon
                      sx={{
                        color: "#10b981",
                        fontSize: "1.1rem",
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        color: isDarkMode ? "#cbd5e1" : "#94a3b8",
                        fontWeight: 500,
                        fontSize: "0.75rem",
                      }}
                    >
                      {job.appliedAt}
                    </Typography>
                  </Box>
                </Box>

                {/* Status Badge and Action Buttons */}
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "flex-start", sm: "flex-end" }, gap: 1.5, ml: { xs: 0, sm: "auto" }, flexShrink: 0 }}>
                  <StatusBadge status={job.status} onClick={() => setEditingJob(job)} />
                  <Box sx={{ display: "flex", gap: 0.5 }}>
                    <IconButton
                      size="small"
                      onClick={() => setEditingJob(job)}
                      sx={{
                        color: "#6366f1",
                        backgroundColor: "rgba(99, 102, 241, 0.05)",
                        border: "1px solid rgba(99, 102, 241, 0.2)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "rgba(99, 102, 241, 0.15)",
                          borderColor: "rgba(99, 102, 241, 0.4)",
                        },
                      }}
                      title="Edit job"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setJobToDelete(job.id);
                        setDeleteConfirmOpen(true);
                      }}
                      sx={{
                        color: "#ef4444",
                        backgroundColor: "rgba(239, 68, 68, 0.05)",
                        border: "1px solid rgba(239, 68, 68, 0.2)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "rgba(239, 68, 68, 0.15)",
                          borderColor: "rgba(239, 68, 68, 0.4)",
                        },
                      }}
                      title="Delete job"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Delete Job Application</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this job application? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Job Dialog */}
      <Dialog open={!!editingJob} onClose={() => setEditingJob(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Job Application</DialogTitle>
        <DialogContent sx={{ pt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          {editingJob && (
            <>
              <TextField
                fullWidth
                label="Company Name"
                value={editingJob.companyName}
                onChange={(e) =>
                  setEditingJob({ ...editingJob, companyName: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Job Role"
                value={editingJob.role}
                onChange={(e) =>
                  setEditingJob({ ...editingJob, role: e.target.value })
                }
              />
              <TextField
                fullWidth
                select
                label="Status"
                value={editingJob.status}
                onChange={(e) =>
                  setEditingJob({ ...editingJob, status: e.target.value as JobStatus })
                }
              >
                <MenuItem value="Applied">Applied</MenuItem>
                <MenuItem value="Interview">Interview</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </TextField>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingJob(null)}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
