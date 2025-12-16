/**
 * Loading Component
 * Displays a loading skeleton while data is being fetched
 * Works with Suspense boundaries for progressive loading
 */

import { Skeleton, Stack, Card, CardContent, Grid, Box } from "@mui/material";

export default function Loading() {
  return (
    <Stack spacing={3}>
      {/* Skeleton loader for form */}
      <Card elevation={3} sx={{ mb: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <Skeleton variant="text" width="30%" height={40} sx={{ mb: 2 }} />
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Skeleton variant="rounded" height={60} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Skeleton variant="rounded" height={60} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Skeleton variant="rounded" height={60} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Skeleton variant="rounded" height={48} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Skeleton loaders for job cards */}
      {Array.from({ length: 3 }).map((_, i) => (
        <Grid size={{ xs: 12 }} key={i}>
          <Card elevation={2}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="40%" height={32} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="30%" height={20} />
                </Box>
                <Skeleton variant="rounded" width={100} height={32} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Stack>
  );
}
