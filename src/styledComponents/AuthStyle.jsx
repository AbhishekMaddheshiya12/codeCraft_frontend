import { Button, Paper, TextField, styled } from "@mui/material";

// ---------- Theme Colors ----------

export const COLORS = {
  bgLeftMain: "#090d16",
  textPrimary: "#ffffff",
  textSecondary: "#94a3b8",

  accentGreen: "#10b981",
  accentGreenHover: "#059669",
  accentBlue: "#2563eb",

  syntaxString: "#f59e0b",

  borderColor: "#1e293b",
};

// ---------- Paper ----------

export const GlassPaper = styled(Paper)({
  padding: "32px",
  backgroundColor: COLORS.bgLeftMain,
  border: `1px solid ${COLORS.borderColor}`,
  borderRadius: "12px",
  color: COLORS.textPrimary,

  width: "100%",
  minHeight: "520px",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

// ---------- Input ----------

export const StyledTextField = styled(TextField)({
  "& .MuiInputLabel-root": {
    color: COLORS.textSecondary,
    fontFamily: "'Fira Code', monospace",

    "&.Mui-focused": {
      color: COLORS.accentGreen,
    },
  },

  "& .MuiInput-root": {
    color: COLORS.syntaxString,

    "&:before": {
      borderBottomColor: COLORS.borderColor,
    },

    "&:hover:not(.Mui-disabled):before": {
      borderBottomColor: COLORS.textSecondary,
    },

    "&:after": {
      borderBottomColor: COLORS.accentGreen,
    },
  },

  "& .MuiInput-input": {
    fontFamily: "'Fira Code', monospace",
    fontSize: "0.9rem",
    color: COLORS.syntaxString,
  },
});

// ---------- Main Button ----------

export const CyberButton = styled(Button)({
  background: `linear-gradient(
    135deg,
    ${COLORS.accentGreen} 0%,
    ${COLORS.accentGreenHover} 100%
  )`,

  color: "#050810",

  fontWeight: 800,

  padding: "12px",

  borderRadius: "8px",

  textTransform: "none",

  fontFamily: "'Fira Code', monospace",

  minHeight: "48px",

  boxShadow: "0 4px 20px rgba(16,185,129,.2)",

  transition: "all .2s ease",

  "&:hover": {
    background:
      "linear-gradient(135deg,#059669 0%,#047857 100%)",
    transform: "translateY(-1px)",
  },

  "&:disabled": {
    background: "#1e293b",
    color: "#64748b",
  },
});

// ---------- Footer Button ----------

export const AuthTextButton = styled(Button)({
  color: COLORS.accentGreen,

  fontWeight: 700,

  textTransform: "none",

  fontFamily: "'Fira Code', monospace",

  fontSize: ".85rem",

  "&:hover": {
    background: "transparent",
    color: COLORS.textPrimary,
  },
});