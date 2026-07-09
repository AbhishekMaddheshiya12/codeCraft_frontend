import { Box, Paper, styled } from "@mui/material";
import { alpha } from "@mui/material/styles";

export const ProfileWrapper = styled(Box)({
  minHeight: "100vh",
  backgroundColor: "#090d16",
  color: "#ffffff",
  position: "relative",
  overflow: "hidden",

  backgroundImage: `
    radial-gradient(circle at top left, rgba(16,185,129,.12), transparent 35%),
    radial-gradient(circle at bottom right, rgba(37,99,235,.08), transparent 35%)
  `,
});

export const GlassCard = styled(Paper)(({ theme }) => ({
  background: "#090d16",
  border: "1px solid #1e293b",
  borderRadius: "16px",
  padding: theme.spacing(3),
  color: "#fff",

  boxShadow:
    "0 30px 60px -15px rgba(2,6,23,.9), inset 0 1px 0 rgba(255,255,255,.04)",

  transition: "all .25s ease",

  "&:hover": {
    borderColor: alpha("#10b981", 0.35),
  },

  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(2),
  },
}));

export const SidebarCard = styled(GlassCard)(({ theme, isMobile }) => ({
  position: isMobile ? "relative" : "sticky",
  top: "84px",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  textAlign: "center",

  height: "fit-content",

  [theme.breakpoints.down("md")]: {
    position: "relative",
    top: 0,
  },
}));