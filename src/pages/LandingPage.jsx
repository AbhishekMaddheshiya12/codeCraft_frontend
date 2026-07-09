import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import NavBar from "../components/NavBar";
import { styled } from "@mui/material";

import { Box, Typography, Stack, Container } from "@mui/material";

import CodeIcon from "@mui/icons-material/Code";

import {
  LandingWrapper,
  TechGridOverlay,
  RadialGlow,
  revealUp,
} from "../styledComponents/HomePageStyle.jsx";

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
      <TechGridOverlay />

      <RadialGlow
        color="radial-gradient(circle, #10b981, transparent)"
        top="-10%"
        left="-5%"
        delay="0s"
      />

      <RadialGlow
        color="radial-gradient(circle, #2563eb, transparent)"
        top="30%"
        right="-10%"
        delay="-4s"
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            height: "calc(100vh - 64px)",
            alignItems: "center",
          }}
        >
          <SideContent>
            <Stack spacing={3}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <CodeIcon sx={{ color: "#10b981", fontSize: 40 }} />
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 900, letterSpacing: "-1px" }}
                >
                  CODECRAFT
                </Typography>
              </Box>

              <Typography
                variant="h1"
                sx={{ fontWeight: 800, fontSize: "4.5rem", lineHeight: 1.1 }}
              >
                Master the <br />
                <Box
                  component="span"
                  sx={{
                    background:
                      "linear-gradient(120deg, #10b981 0%, #059669 50%, #2563eb 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline",
                    fontWeight: 900,
                  }}
                >
                  Syntax.
                </Box>
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "#94a3b8",
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                  maxWidth: "520px",
                }}
              >
                The ultimate cloud-native playground for developers. Solve
                complex algorithms, collaborate in real-time, and deploy your
                logic to the grid.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 5,
                  pt: 3,
                  borderTop: "1px solid rgba(30, 41, 59, 0.6)",
                  width: "fit-content",
                }}
              >
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      color: "#fff",
                      fontFamily: "monospace",
                    }}
                  >
                    50K+
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#475569",
                      fontWeight: 700,
                      letterSpacing: ".5px",
                    }}
                  >
                    DEVS ACTIVE
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    100+
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#64748b" }}>
                    CHALLENGES
                  </Typography>
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
              p: 2,
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: "450px",
                animation: `${revealUp} .7s cubic-bezier(.16,1,.3,1)`,
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
    </LandingWrapper>
  );
}

export default LandingPage;
