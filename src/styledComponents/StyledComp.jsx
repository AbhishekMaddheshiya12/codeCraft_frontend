import React from "react";
import { Link as link } from "react-router";
import { Box, Button, Paper, styled, alpha,TableRow,Select,IconButton} from "@mui/material";

export const Link = styled(link)`
    color:black;
    text-decoration: none;
`

export const InputBox = styled("input")`
  flex: 1;
  width: auto;
  border: none;
  outline: none;
  padding: 0.8rem 1rem;
  background: transparent;
  color: #fff;

  &::placeholder {
    color: #64748b;
  }
`;

export const LogCard = styled(Paper)(({ status }) => ({
  background: alpha("#0f172a", 0.6),
  backdropFilter: "blur(10px)",
  borderRadius: "12px",
  border: `1px solid ${
    status === "Accepted"
      ? alpha("#10b981", 0.3)
      : alpha("#ef4444", 0.3)
  }`,
  padding: "16px 20px",
  marginBottom: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  transition: "transform 0.2s ease",

  "&:hover": {
    transform: "translateX(5px)",
    background: alpha("#0f172a", 0.8),
  },
}));

export const TabButton = styled(Button)(({ active }) => ({
  backgroundColor: active ? alpha("#6366f1", 0.2) : "transparent",
  color: active ? "#818cf8" : "#94a3b8",
  border: `1px solid ${
    active ? alpha("#6366f1", 0.5) : alpha("#ffffff", 0.1)
  }`,
  borderRadius: "8px",
  fontSize: "0.75rem",
  fontWeight: 700,
  padding: "6px 16px",
  textTransform: "none",

  "&:hover": {
    backgroundColor: alpha("#6366f1", 0.15),
    borderColor: "#6366f1",
  },
}));

export const SubmissionWrapper = styled(Box)({
  height: "calc(100vh - 64px)",
  overflowY: "auto",
  padding: "24px",
  backgroundColor: "#020617",

  "&::-webkit-scrollbar": {
    width: "4px",
  },

  "&::-webkit-scrollbar-thumb": {
    background: alpha("#6366f1", 0.3),
    borderRadius: "10px",
  },
});

export const EmptySubmissionBox = styled(Box)({
  textAlign: "center",
  padding: "80px 0",
  border: `1px dashed ${alpha("#ffffff", 0.1)}`,
  borderRadius: "20px",
});

export const COLORS = {
  bg: "#090d16",
  card: "#0b111e",
  border: "#1e293b",

  primary: "#10b981",
  primaryDark: "#059669",
  secondary: "#2563eb",

  white: "#ffffff",
  gray: "#94a3b8",
  darkGray: "#64748b",

  easy: "#10b981",
  medium: "#f59e0b",
  hard: "#ef4444",
};

// ---------- Card ----------

export const ProfileGlassPaper = styled(Box)({
  background: COLORS.bg,
  border: `1px solid ${COLORS.border}`,
  color: COLORS.white,
  display: "flex",
  flexDirection: "column",
  borderRadius: "12px",
});

export const StyledRow = styled(TableRow)(({ theme }) => ({
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: alpha("#6366f1", 0.08),
    cursor: "pointer",
  },
  "& td": {
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    color: "#e2e8f0",
  },
}));

export const ScrollContainer = styled(Box)(({ theme }) => ({
  height: `calc(100vh - 64px)`,
  overflowY: "auto",
  padding: theme.spacing(3),
  background: "#090d16",
  backgroundImage: `radial-gradient(circle at 0% 0%, rgba(16, 185, 129, 0.08) 0%, transparent 50%)`, 
  color: "#ffffff",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": { display: "none" }, 
  msOverflowStyle: "none",
}));

export const StyledButton = styled(Button)({
  backgroundColor: "rgba(30, 41, 59, 0.4)",
  color: "#cbd5e1",
  fontSize: "0.75rem",
  fontWeight: 800,
  fontFamily: "'Fira Code', monospace",
  textTransform: "none",
  borderRadius: "8px",
  padding: "6px 16px",
  border: "1px solid rgba(30, 41, 59, 0.8)",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "rgba(30, 41, 59, 0.8)",
    color: "#ffffff",
    borderColor: "#10b981",
  },
});

export const ExampleBox = styled(Box)({
  backgroundColor: "rgba(30, 41, 59, 0.2)",
  padding: "16px",
  marginTop: "16px",
  borderRadius: "8px",
  border: "1px solid #1e293b",
  fontFamily: "monospace",
});

export const PlayGroundContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "calc(100vh - 64px)", 
  backgroundColor: "#090d16", // Adjusted container color
  overflow: "hidden",
});

export const ActionButton = styled(Button)({
  backgroundColor: "rgba(30, 41, 59, 0.4)",
  color: "#cbd5e1",
  padding: "6px 20px",
  fontWeight: 800,
  borderRadius: "8px",
  fontSize: "0.8rem",
  textTransform: "none",
  fontFamily: "'Fira Code', monospace",
  border: "1px solid rgba(30, 41, 59, 0.8)",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "rgba(30, 41, 59, 0.8)",
    borderColor: "#10b981",
    color: "#fff",
  },
});
export const ConsoleBox = styled(Box)({
  height: "100%",
  backgroundColor: "#090d16", // Adjusted container color
  color: "white",
  padding: "16px",
  overflowY: "auto",
  overflowX: "hidden",
  scrollbarWidth: "none", 
  "&::-webkit-scrollbar": { display: "none" },
  msOverflowStyle: "none",
});

export const EditorNavWrapper = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "rgba(9, 13, 22, 0.9)", 
  padding: "8px 24px",
  borderBottom: "1px solid rgba(30, 41, 59, 0.6)",
});

export const StyledSelect = styled(Select)({
  color: "#cbd5e1",
  fontSize: "0.75rem",
  fontFamily: "'Fira Code', monospace",
  fontWeight: 800,
  backgroundColor: "rgba(30, 41, 59, 0.4)",
  borderRadius: "6px",
  border: "1px solid rgba(30, 41, 59, 0.8)",
  transition: "all 0.2s ease-in-out",
  "& .MuiSelect-select": {
    padding: "6px 14px",
    paddingRight: "32px !important",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none", 
  },
  "&:hover": {
    backgroundColor: "rgba(30, 41, 59, 0.7)",
    border: "1px solid #10b981", 
    color: "#ffffff",
  },
  "& .MuiSelect-icon": {
    color: "#94a3b8",
  },
  "&:hover .MuiSelect-icon": {
    color: "#10b981",
  }
});

export const ActionIcon = styled(IconButton)({
  color: "#94a3b8",
  padding: "8px",
  borderRadius: "6px",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    color: "#10b981", 
    backgroundColor: "rgba(30, 41, 59, 0.4)",
  },
});

export const GlassNav = styled(Paper)(({ theme }) => ({
  background: alpha("#090d16", 0.85),
  backdropFilter: "blur(24px)",
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 30px',
  borderRadius: 0,
  borderBottom: `1px solid ${alpha("#ffffff", 0.1)}`, // Higher visibility separator
  backgroundImage: "none", 
}));

// Sky blue/cyan accents offer crisp, readable contrast against deep blacks
export const NavButton = styled(Button)(({ theme }) => ({
  color: "#cbd5e1", // Brighter gray text for better readability
  fontWeight: 700,
  textTransform: 'none',
  fontSize: '0.85rem',
  fontFamily: 'monospace',
  padding: '6px 16px',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: "#38bdf8", // Sky blue text on hover
    background: alpha("#38bdf8", 0.12), // Vibrant glow fill
    transform: 'translateY(-1px)'
  },
}));
