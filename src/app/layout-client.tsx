"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode, useEffect, useState, createContext, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  Link as MuiLink,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { AuthProvider, useAuth } from "@/lib/auth-context";

// Theme Context
interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useThemeMode() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within ThemeProvider");
  }
  return context;
}

// Create themes for light and dark modes
const createAppTheme = (isDarkMode: boolean) => {
  const lightPalette = {
    primary: {
      main: "#4f46e5",
      light: "#6366f1",
      dark: "#4338ca",
    },
    secondary: {
      main: "#7c3aed",
      light: "#a78bfa",
      dark: "#6d28d9",
    },
    background: {
      default: "#f9fafb",
      paper: "#ffffff",
    },
    success: {
      main: "#059669",
    },
    warning: {
      main: "#d97706",
    },
    error: {
      main: "#dc2626",
    },
    info: {
      main: "#0891b2",
    },
  };

  const darkPalette = {
    primary: {
      main: "#818cf8",
      light: "#a5b4fc",
      dark: "#6366f1",
    },
    secondary: {
      main: "#d8b4fe",
      light: "#e9d5ff",
      dark: "#a78bfa",
    },
    background: {
      default: "#0f172a",
      paper: "#1e293b",
    },
    success: {
      main: "#10b981",
    },
    warning: {
      main: "#f59e0b",
    },
    error: {
      main: "#ef4444",
    },
    info: {
      main: "#06b6d4",
    },
  };

  const palette = isDarkMode ? darkPalette : lightPalette;

  return createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      ...palette,
    },
    typography: {
      fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: "3rem",
        fontWeight: 800,
        letterSpacing: "-1px",
        lineHeight: 1.2,
      },
      h2: {
        fontSize: "2.25rem",
        fontWeight: 700,
        letterSpacing: "-0.5px",
        lineHeight: 1.3,
      },
      h3: {
        fontSize: "1.875rem",
        fontWeight: 600,
        letterSpacing: "-0.3px",
      },
      h4: {
        fontSize: "1.5rem",
        fontWeight: 600,
      },
      h5: {
        fontSize: "1.25rem",
        fontWeight: 600,
      },
      h6: {
        fontSize: "1rem",
        fontWeight: 600,
      },
      body1: {
        fontSize: "1rem",
        lineHeight: 1.6,
      },
      body2: {
        fontSize: "0.875rem",
        lineHeight: 1.6,
      },
      button: {
        textTransform: "none",
        fontWeight: 600,
        letterSpacing: "0.5px",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "10px",
            padding: "12px 24px",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            fontSize: "1rem",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: isDarkMode
                ? "0 12px 24px rgba(129, 140, 248, 0.3)"
                : "0 12px 24px rgba(79, 70, 229, 0.3)",
            },
          },
          containedPrimary: {
            background: isDarkMode
              ? "linear-gradient(135deg, #818cf8 0%, #6366f1 100%)"
              : "linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)",
            color: "#ffffff",
            "&:hover": {
              background: isDarkMode
                ? "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)"
                : "linear-gradient(135deg, #4338ca 0%, #3730a3 100%)",
              boxShadow: isDarkMode
                ? "0 12px 24px rgba(129, 140, 248, 0.4)"
                : "0 12px 24px rgba(79, 70, 229, 0.4)",
            },
          },
          outlined: {
            borderColor: isDarkMode ? "#475569" : "#e2e8f0",
            borderWidth: "2px",
            color: palette.primary.main,
            "&:hover": {
              borderColor: palette.primary.main,
              backgroundColor: isDarkMode
                ? `rgba(129, 140, 248, 0.1)`
                : `rgba(79, 70, 229, 0.05)`,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "16px",
            border: isDarkMode ? "1px solid #334155" : "1px solid #e2e8f0",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
            "&:hover": {
              boxShadow: isDarkMode
                ? "0 20px 40px rgba(129, 140, 248, 0.15)"
                : "0 20px 40px rgba(79, 70, 229, 0.1)",
              transform: "translateY(-4px)",
              borderColor: isDarkMode ? "#475569" : "#cbd5e1",
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: isDarkMode
              ? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)",
            boxShadow: isDarkMode
              ? "0 4px 16px rgba(0, 0, 0, 0.3)"
              : "0 4px 16px rgba(0, 0, 0, 0.08)",
            color: isDarkMode ? "#e2e8f0" : "#1e293b",
            borderBottom: isDarkMode ? "1px solid #334155" : "1px solid #e2e8f0",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              transition: "all 0.3s ease",
              backgroundColor: isDarkMode ? "#0f172a" : "#f9fafb",
              borderColor: isDarkMode ? "#334155" : "#e2e8f0",
              "&:hover fieldset": {
                borderColor: isDarkMode ? "#475569" : "#cbd5e1",
              },
              "&.Mui-focused fieldset": {
                borderColor: palette.primary.main,
                boxShadow: isDarkMode
                  ? `0 0 0 3px rgba(129, 140, 248, 0.1)`
                  : `0 0 0 3px rgba(79, 70, 229, 0.1)`,
              },
            },
            "& .MuiOutlinedInput-input": {
              fontSize: "1rem",
              "&::placeholder": {
                color: isDarkMode ? "#64748b" : "#94a3b8",
                opacity: 1,
              },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "0.875rem",
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: "16px",
            boxShadow: isDarkMode
              ? "0 25px 50px rgba(0, 0, 0, 0.5)"
              : "0 25px 50px rgba(0, 0, 0, 0.15)",
          },
        },
      },
    },
  });
};

// User Menu Component
function UserMenu() {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isDarkMode } = useThemeMode();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      handleClose();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!user) return null;

  return (
    <>
      <Button
        startIcon={<AccountCircleIcon />}
        onClick={handleClick}
        sx={{
          color: "#1e293b",
          textTransform: "none",
          fontWeight: 600,
          fontSize: { xs: "0.85rem", sm: "1rem" },
          padding: "8px 16px",
          borderRadius: "10px",
          transition: "all 0.3s ease",
          backgroundColor: "rgba(99, 102, 241, 0.05)",
          border: "1px solid rgba(99, 102, 241, 0.2)",
          "&:hover": {
            backgroundColor: "rgba(99, 102, 241, 0.1)",
            borderColor: "rgba(99, 102, 241, 0.4)",
          },
        }}
      >
        {user.email?.split("@")[0]}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            boxShadow: isDarkMode
              ? "0 20px 40px rgba(0, 0, 0, 0.5)"
              : "0 20px 40px rgba(0, 0, 0, 0.1)",
            borderRadius: "12px",
            border: isDarkMode ? "1px solid #334155" : "1px solid #e2e8f0",
            backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
            mt: 1,
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem disabled>
          <Box>
            <Typography variant="caption" sx={{ color: isDarkMode ? "#64748b" : "#94a3b8", fontWeight: 500, display: "block" }}>
              Logged in as
            </Typography>
            <Typography variant="body2" sx={{ color: isDarkMode ? "#e2e8f0" : "#1e293b", fontWeight: 600 }}>
              {user.email}
            </Typography>
          </Box>
        </MenuItem>
        <Box sx={{ borderTop: isDarkMode ? "1px solid #334155" : "1px solid #e2e8f0", my: 1 }} />
        <MenuItem
          onClick={handleLogout}
          sx={{
            "&:hover": {
              backgroundColor: isDarkMode ? "rgba(239, 68, 68, 0.15)" : "rgba(239, 68, 68, 0.05)",
            },
          }}
        >
          <LogoutIcon sx={{ mr: 1.5, fontSize: "1.2rem", color: "#ef4444" }} />
          <Typography sx={{ color: "#ef4444", fontWeight: 600 }}>Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

// Layout Content Component
function LayoutContent({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { isDarkMode } = useThemeMode();
  const theme = createAppTheme(isDarkMode);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Navigation Header */}
      <AppBar position="sticky" elevation={0}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            py: 1.5,
            px: { xs: 2, sm: 3, md: 4 },
            gap: { xs: 1, sm: 2 },
            minHeight: "72px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 }, minWidth: 0 }}>
            <Box
              sx={{
                width: { xs: 40, sm: 48 },
                height: { xs: 40, sm: 48 },
                borderRadius: "12px",
                background: isDarkMode
                  ? "linear-gradient(135deg, #818cf8 0%, #6366f1 100%)"
                  : "linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                flexShrink: 0,
              }}
            >
              <WorkIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.1rem", sm: "1.4rem", md: "1.6rem" },
                  background: isDarkMode
                    ? "linear-gradient(135deg, #818cf8 0%, #a5b4fc 100%)"
                    : "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.5px",
                  whiteSpace: "nowrap",
                }}
              >
                JobTracker
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontSize: "0.65rem",
                  color: isDarkMode ? "#94a3b8" : "#64748b",
                  fontWeight: 500,
                }}
              >
                Track your journey
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: { xs: 1, sm: 2, md: 3 }, alignItems: "center", ml: "auto" }}>
            {/* Protected Navigation Links - Hidden on Mobile */}
            <Box sx={{ display: { xs: "none", sm: "flex" }, gap: { sm: 1, md: 2 } }}>
              <MuiLink
                href="/"
                sx={{
                  color: isDarkMode ? "#e2e8f0" : "#1e293b",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: { sm: "0.9rem", md: "1rem" },
                  padding: "8px 16px",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: isDarkMode
                      ? "rgba(129, 140, 248, 0.2)"
                      : "rgba(79, 70, 229, 0.1)",
                    color: isDarkMode ? "#a5b4fc" : "#4f46e5",
                  },
                }}
              >
                Dashboard
              </MuiLink>
              <MuiLink
                href="/jobs"
                sx={{
                  color: isDarkMode ? "#e2e8f0" : "#1e293b",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: { sm: "0.9rem", md: "1rem" },
                  padding: "8px 16px",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: isDarkMode
                      ? "rgba(129, 140, 248, 0.2)"
                      : "rgba(79, 70, 229, 0.1)",
                    color: isDarkMode ? "#a5b4fc" : "#4f46e5",
                  },
                }}
              >
                All Jobs
              </MuiLink>
            </Box>
            <ThemeToggleButton />
            <UserMenu />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          backgroundColor: theme.palette.background.default,
          minHeight: "calc(100vh - 200px)",
          py: { xs: 3, sm: 4, md: 6 },
          px: { xs: 1.5, sm: 2, md: 3 },
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>{children}</Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: isDarkMode ? "#0f172a" : "#f9fafb",
          color: isDarkMode ? "#94a3b8" : "#64748b",
          borderTop: isDarkMode ? "1px solid #334155" : "1px solid #e2e8f0",
          py: { xs: 4, sm: 5 },
          mt: { xs: 6, sm: 8, md: 12 },
          textAlign: "center",
          px: { xs: 2, sm: 3 },
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" }, fontWeight: 500, color: isDarkMode ? "#cbd5e1" : "#475569" }}>
            © 2025 JobTracker. Build your dream career.
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ fontSize: "0.75rem", color: isDarkMode ? "#64748b" : "#94a3b8" }}>
          Made with care by{" "}
          <Box component="span" sx={{ fontWeight: 600, color: isDarkMode ? "#94a3b8" : "#475569" }}>
            Garv Pankaj
          </Box>
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

// Theme Toggle Button Component
function ThemeToggleButton() {
  const { isDarkMode, toggleDarkMode } = useThemeMode();

  return (
    <IconButton
      onClick={toggleDarkMode}
      sx={{
        color: isDarkMode ? "#fbbf24" : "#f59e0b",
        backgroundColor: isDarkMode
          ? "rgba(251, 191, 36, 0.1)"
          : "rgba(245, 158, 11, 0.1)",
        border: isDarkMode
          ? "1px solid rgba(251, 191, 36, 0.3)"
          : "1px solid rgba(245, 158, 11, 0.3)",
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: isDarkMode
            ? "rgba(251, 191, 36, 0.2)"
            : "rgba(245, 158, 11, 0.2)",
          transform: "scale(1.1)",
        },
      }}
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <LightModeIcon sx={{ fontSize: "1.3rem" }} />
      ) : (
        <DarkModeIcon sx={{ fontSize: "1.3rem" }} />
      )}
    </IconButton>
  );
}

export function LayoutClient({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem("theme-mode");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(savedTheme ? savedTheme === "dark" : prefersDark);
    setMounted(true);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newValue = !prev;
      localStorage.setItem("theme-mode", newValue ? "dark" : "light");
      return newValue;
    });
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <AuthProvider>
        <LayoutContent>{children}</LayoutContent>
      </AuthProvider>
    </ThemeContext.Provider>
  );
}