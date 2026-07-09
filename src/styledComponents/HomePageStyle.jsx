import { Box, Typography, styled ,Container,Paper,TableCell} from "@mui/material";
import { keyframes } from "@mui/system";

// -------------------- Animations --------------------

export const revealUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const auroraFlow = keyframes`
  0% {
    transform: translate(0px, 0px) scale(1);
  }

  50% {
    transform: translate(40px, -60px) scale(1.15);
  }

  100% {
    transform: translate(0px, 0px) scale(1);
  }
`;

const blink = keyframes`
  50% {
    opacity: 0;
  }
`;

// -------------------- Styled Components --------------------

export const LandingWrapper = styled(Box)({
  minHeight: "100vh",
  backgroundColor: "#090d16",
  color: "#f1f5f9",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
});

export const TechGridOverlay = styled(Box)({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  zIndex: 0,
  backgroundImage: `
    linear-gradient(to right, rgba(16, 185, 129, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(16, 185, 129, 0.03) 1px, transparent 1px)
  `,
  backgroundSize: "56px 56px",
  maskImage:
    "linear-gradient(to bottom, black 20%, rgba(0,0,0,0.8) 50%, transparent 95%)",
});

export const RadialGlow = styled(Box)(
  ({ color, top, left, right, delay = "0s" }) => ({
    position: "absolute",
    width: "600px",
    height: "600px",
    background: color,
    filter: "blur(160px)",
    zIndex: 0,
    top,
    left,
    right,
    borderRadius: "50%",
    pointerEvents: "none",
    opacity: 0.12,
    animation: `${auroraFlow} 12s ease-in-out infinite`,
    animationDelay: delay,
  })
);

export const TerminalFrame = styled(Box)({
  width: "100%",
  maxWidth: "520px",
  backgroundColor: "#050810",
  border: "1px solid #1e293b",
  borderRadius: "12px",
  boxShadow:
    "0 30px 60px -15px rgba(2, 6, 23, 0.9), inset 0 1px 0px 0px rgba(255,255,255,0.04)",
  position: "relative",
  overflow: "hidden",
  fontFamily: "'Fira Code', 'Courier New', monospace",
  animation: `${revealUp} 0.8s cubic-bezier(0.16, 1, 0.3, 1) both`,
});

export const TerminalHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 16px",
  borderBottom: "1px solid #141e30",
  backgroundColor: "#0b111e",
});

export const Dot = styled(Box)(({ color }) => ({
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  backgroundColor: color,
}));

export const TerminalBody = styled(Box)({
  padding: "24px",
  fontSize: "0.85rem",
  lineHeight: "1.7",
  color: "#94a3b8",
});

export const CodeLine = styled(Typography)({
  fontFamily: "inherit",
  fontSize: "inherit",
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const Cursor = styled("span")({
  display: "inline-block",
  width: "6px",
  height: "14px",
  backgroundColor: "#10b981",
  marginLeft: "4px",
  animation: `${blink} 1s infinite`,
});

export const BadgeWrapper = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  backgroundColor: "rgba(30, 41, 59, 0.7)",
  border: "1px solid #334155",
  padding: "6px 14px",
  borderRadius: "99px",
  width: "fit-content",
});

// -------------------- Home Page Layout --------------------

export const HomeWrapper = styled(Box)({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#090d16",
  color: "#ffffff",
  overflow: "hidden",
  position: "relative",
});

export const MainContent = styled(Container)(({ theme }) => ({
  flex: 1,
  display: "flex",
  gap: theme.spacing(3),
  marginTop: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  overflow: "hidden",
  position: "relative",
  zIndex: 1,
}));

export const ScrollableGrid = styled(Box)(({ theme }) => ({
  flex: 1,
  height: "100%",
  overflowY: "auto",
  overflowX: "hidden",
  paddingRight: theme.spacing(1),

  "&::-webkit-scrollbar": {
    display: "none",
  },

  msOverflowStyle: "none",
  scrollbarWidth: "none",
}));

export const GlassPaper = styled(Paper)({
  backgroundColor: "#090d16",
  border: "1px solid #1e293b",
  borderRadius: "12px",
  boxShadow:
    "0 30px 60px -15px rgba(2,6,23,.9), inset 0 1px 0 rgba(255,255,255,.04)",
  overflow: "hidden",
});

export const HeaderCell = styled(TableCell)({
  backgroundColor: "#0b111e",
  color: "#94a3b8",
  fontWeight: 800,
  fontSize: ".7rem",
  textTransform: "uppercase",
  letterSpacing: "1.5px",
  borderBottom: "1px solid #1e293b",
  position: "sticky",
  top: 0,
  zIndex: 10,
});