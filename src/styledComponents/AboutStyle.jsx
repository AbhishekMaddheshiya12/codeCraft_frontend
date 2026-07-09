import { Box, Button, Paper, Typography, styled } from "@mui/material";

export const AboutWrapper = styled(Box)({
  minHeight: "100vh",
  backgroundColor: "#090d16",
  color: "#ffffff",
  position: "relative",
  overflow: "hidden",
});

export const GlassCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "#090d16",
  border: "1px solid #1e293b",
  borderRadius: "12px",
  boxShadow:
    "0 30px 60px -15px rgba(2,6,23,.9), inset 0 1px 0 rgba(255,255,255,.04)",
  padding: theme.spacing(4),
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transition: "all .3s ease",

  "&:hover": {
    transform: "translateY(-8px)",
    border: "1px solid #10b981",
    boxShadow: "0 0 25px rgba(16,185,129,.15)",
  },
}));

export const HeroOverlay = styled(Box)({
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(to bottom, rgba(9,13,22,.45), rgba(9,13,22,.95))",
  zIndex: 1,
});

export const HeroTitle = styled(Typography)({
  fontWeight: 900,
  letterSpacing: "-2px",
  lineHeight: 1,
  color: "#fff",
});

export const HeroSubtitle = styled(Typography)({
  color: "#94a3b8",
  fontFamily: "'Fira Code', monospace",
  marginTop: "12px",
});

export const SectionTitle = styled(Typography)({
  fontWeight: 900,
  color: "#fff",
});

export const SectionLabel = styled(Typography)({
  color: "#10b981",
  fontWeight: 800,
  letterSpacing: "2px",
});

export const SectionText = styled(Typography)({
  color: "#94a3b8",
  lineHeight: 1.8,
});

export const HeroButton = styled(Button)({
  background: "linear-gradient(135deg,#10b981,#059669)",
  color: "#050810",
  fontWeight: 800,
  padding: "12px 34px",
  borderRadius: "10px",
  textTransform: "none",
  boxShadow: "0 4px 20px rgba(16,185,129,.2)",

  "&:hover": {
    background: "linear-gradient(135deg,#059669,#047857)",
  },
});

export const CodeWrapper = styled(Box)({
  borderRadius: "16px",
  overflow: "hidden",
  border: "1px solid #1e293b",
  boxShadow:
    "0 20px 50px rgba(0,0,0,.45)",
});

export const LogBox = styled(Box)({
  padding: "16px",
  background: "rgba(16,185,129,.08)",
  borderLeft: "4px solid #10b981",
  borderRadius: "8px",
});

export const FooterWrapper = styled(Box)({
  borderTop: "1px solid #1e293b",
  padding: "48px 0",
  textAlign: "center",
});

export const GradientText = styled("span")({
  background:
    "linear-gradient(120deg,#10b981 0%,#059669 45%,#2563eb 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
});

export const CardTitle = styled(Typography)({
  fontWeight: 800,
  letterSpacing: "1px",
  textAlign: "center",
  color: "#fff",
});

export const CardDescription = styled(Typography)({
  color: "#94a3b8",
  textAlign: "center",
  lineHeight: 1.7,
});

export const TerminalText = styled(Typography)({
  color: "#10b981",
  fontFamily: "'Fira Code', monospace",
});

export const FooterText = styled(Typography)({
  color: "#64748b",
  fontFamily: "'Fira Code', monospace",
});