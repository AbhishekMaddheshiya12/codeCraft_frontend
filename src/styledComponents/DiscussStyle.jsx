import { Box, styled } from "@mui/material";

export const DiscussWrapper = styled(Box)({
  height: "100vh",
  backgroundColor: "#090d16",
  color: "#fff",
  overflow: "hidden",
  position: "relative",
});

export const GlassChatArea = styled(Box)(({ theme }) => ({
  backgroundColor: "#090d16",
  border: "1px solid #1e293b",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  height: "calc(100vh - 100px)",
  padding: theme.spacing(2),
  boxShadow:
    "0 30px 60px -15px rgba(2,6,23,.9), inset 0 1px 0 rgba(255,255,255,.04)",
  position: "relative",
  zIndex: 2,
}));

export const SidebarBox = styled(Box)({
  backgroundColor: "#090d16",
  border: "1px solid #1e293b",
  borderRadius: "12px",
  height: "calc(100vh - 100px)",
  overflowY: "auto",

  "&::-webkit-scrollbar": {
    display: "none",
  },

  scrollbarWidth: "none",
});