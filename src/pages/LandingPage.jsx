import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import NavBar from "../components/NavBar";
import { Box, Typography, styled, alpha, Stack, Container } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";

const LandingWrapper = styled(Box)({
  minHeight: "100vh",
  backgroundColor: "#020617", 
  color: "#ffffff",
  position: "relative",
  overflow: "hidden",
});

const BackgroundGrid = styled(Box)({
  position: "absolute",
  inset: 0,
  zIndex: 0,
  backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), 
                    linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)`,
  backgroundSize: "40px 40px",
  maskImage: "radial-gradient(ellipse at center, black, transparent 80%)",
});

const GlowBlob = styled(Box)(({ color, top, left, right }) => ({
  position: "absolute",
  width: "400px",
  height: "400px",
  background: color,
  filter: "blur(120px)",
  opacity: 0.15,
  zIndex: 0,
  top: top,
  left: left,
  right: right,
  borderRadius: "50%",
}));

const SideContent = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("md")]: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(8),
    flex: 1,
  },
}));

function LandingPage() {
  const [islogin, setIsLogin] = useState(false);

  return (
    <LandingWrapper>
      <NavBar />
      <BackgroundGrid />
      <GlowBlob color="radial-gradient(circle, #6366f1, transparent)" top="-10%" left="-5%" />
      <GlowBlob color="radial-gradient(circle, #a855f7, transparent)" top="50%" right="-10%" />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Box 
          sx={{ 
            display: "flex", 
            height: "calc(100vh - 64px)", 
            alignItems: "center" 
          }}
        >
          <SideContent>
            <Stack spacing={3}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <CodeIcon sx={{ color: "#818cf8", fontSize: 40 }} />
                <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: "-1px" }}>
                  CODECRAFT
                </Typography>
              </Box>
              
              <Typography variant="h1" sx={{ fontWeight: 800, fontSize: "4.5rem", lineHeight: 1.1 }}>
                Master the <br />
                <span style={{ 
                  background: "linear-gradient(90deg, #6366f1, #22d3ee)", 
                  WebkitBackgroundClip: "text", 
                  WebkitTextFillColor: "transparent" 
                }}>
                  Syntax.
                </span>
              </Typography>

              <Typography variant="h6" sx={{ color: "#94a3b8", fontWeight: 400, maxWidth: "500px" }}>
                The ultimate cloud-native playground for developers. Solve complex algorithms, 
                collaborate in real-time, and deploy your logic to the grid.
              </Typography>

              <Box sx={{ pt: 4, display: "flex", gap: 4 }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>50K+</Typography>
                  <Typography variant="caption" sx={{ color: "#64748b" }}>DEVS ACTIVE</Typography>
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>100+</Typography>
                  <Typography variant="caption" sx={{ color: "#64748b" }}>CHALLENGES</Typography>
                </Box>
              </Box>
            </Stack>
          </SideContent>
          <Box 
            sx={{ 
              flex: 1, 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center",
              p: 2 
            }}
          >
            <Box 
              sx={{ 
                width: "100%", 
                maxWidth: "450px",
                animation: "fadeInUp 0.6s ease-out" 
              }}
            >
              {islogin ? (
                <Login setIsLogin={setIsLogin} />
              ) : (
                <Signup setIsLogin={setIsLogin} />
              )}
            </Box>
          </Box>
        </Box>
      </Container>
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </LandingWrapper>
  );
}

export default LandingPage;