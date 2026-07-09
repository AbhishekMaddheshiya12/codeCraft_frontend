import React from "react";
import { Box, Typography, styled, Stack, Container, Button } from "@mui/material";
import { keyframes } from "@mui/system";
import TerminalIcon from "@mui/icons-material/Terminal";
import ShieldIcon from "@mui/icons-material/Shield";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router";
import {
  LandingWrapper,
  TechGridOverlay,
  RadialGlow,
  TerminalFrame,
  TerminalHeader,
  TerminalBody,
  Dot,
  CodeLine,
  Cursor,
  BadgeWrapper,
  revealUp,
} from "../styledComponents/HomePageStyle.jsx";

const auroraFlow = keyframes`
  0% { transform: translate(0px, 0px) scale(1); }
  50% { transform: translate(40px, -60px) scale(1.15); }
  100% { transform: translate(0px, 0px) scale(1); }
`;

const blink = keyframes`
  50% { opacity: 0; }
`;


function LandingPage() {
  const navigate = useNavigate();
  const handleAuthClick = () => {
    navigate("/authentication");
  }
  return (
    <LandingWrapper>
      <NavBar />
      <TechGridOverlay />
      
      <RadialGlow color="radial-gradient(circle, #10b981, transparent)" top="-10%" left="-5%" delay="0s" />
      <RadialGlow color="radial-gradient(circle, #2563eb, transparent)" top="30%" right="-10%" delay="-4s" />

      <Container 
        maxWidth="lg" 
        sx={{ 
          flex: 1, 
          display: "flex", 
          alignItems: "center", 
          position: "relative", 
          zIndex: 1,
          py: { xs: 8, md: 0 }
        }}
      >
        <Box 
          sx={{ 
            display: "grid", 
            gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
            gap: { xs: 8, lg: 12 },
            alignItems: "center",
            width: "100%"
          }}
        >
          <Stack 
            spacing={4} 
            sx={{ 
              animation: `${revealUp} 0.7s cubic-bezier(0.16, 1, 0.3, 1)`
            }}
          >
            <BadgeWrapper>
              <TerminalIcon sx={{ color: "#10b981", fontSize: 16 }} />
              <Typography 
                variant="caption" 
                sx={{ fontWeight: 700, letterSpacing: "1px", color: "#cbd5e1", textTransform: "uppercase" }}
              >
                Production Cluster Online
              </Typography>
            </BadgeWrapper>
            
            <Typography 
              variant="h1" 
              sx={{ 
                fontWeight: 800, 
                fontSize: { xs: "2.8rem", sm: "3.5rem", lg: "4.2rem" }, 
                lineHeight: 1.1,
                letterSpacing: "-0.04em",
                color: "#ffffff"
              }}
            >
              The technical forge for{" "}
              <Box
                component="span"
                sx={{ 
                  background: "linear-gradient(120deg, #10b981 0%, #059669 50%, #2563eb 100%)", 
                  WebkitBackgroundClip: "text", 
                  WebkitTextFillColor: "transparent",
                  display: "inline",
                  fontWeight: 900
                }}
              >
                elite syntax.
              </Box>
            </Typography>

            <Typography variant="body1" sx={{ color: "#94a3b8", fontSize: "1.1rem", lineHeight: 1.6, maxWidth: "520px" }}>
              An isolated, highly optimized runtime playground. Write performant logic, track structural complexity, and crunch calculations straight into an active production grid.
            </Typography>

            <Box sx={{ pt: 1 }}>
              <Button
                variant="contained"
                onClick={handleAuthClick}
                endIcon={<ShieldIcon sx={{ fontSize: 18 }} />}
                sx={{
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  color: "#090d16",
                  fontWeight: 800,
                  textTransform: "none",
                  borderRadius: "8px",
                  fontFamily: "'Fira Code', monospace",
                  letterSpacing: "-0.5px",
                  px: 4,
                  py: 2,
                  fontSize: "1.05rem",
                  boxShadow: "0 4px 25px rgba(16, 185, 129, 0.25)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
                  }
                }}
              >
                ssh root@codecraft --authenticate
              </Button>
            </Box>

            <Box sx={{ display: "flex", gap: 5, pt: 2, borderTop: "1px solid rgba(30, 41, 59, 0.6)", width: "fit-content" }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: "#ffffff", fontFamily: "monospace" }}>0.04ms</Typography>
                <Typography variant="caption" sx={{ color: "#475569", fontWeight: 700, letterSpacing: "0.5px" }}>COMPILATION SPEED</Typography>
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: "#ffffff", fontFamily: "monospace" }}>99.99%</Typography>
                <Typography variant="caption" sx={{ color: "#475569", fontWeight: 700, letterSpacing: "0.5px" }}>SANDBOX ISOLATION</Typography>
              </Box>
            </Box>
          </Stack>

          {/* Right Side: Visual Terminal Mockup */}
          <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" } }}>
            <TerminalFrame>
              <TerminalHeader>
                <Stack direction="row" spacing={1}>
                  <Dot color="#ef4444" />
                  <Dot color="#eab308" />
                  <Dot color="#22c55e" />
                </Stack>
                <Typography variant="caption" sx={{ color: "#475569", fontWeight: 600, letterSpacing: "0.5px" }}>
                  bash - codecraft@grid-node-1
                </Typography>
              </TerminalHeader>
              
              <TerminalBody>
                <Stack spacing={1.5}>
                  <CodeLine sx={{ color: "#475569" }}>
                    $ <span style={{ color: "#38bdf8" }}>npm init</span> codecraft-env@latest
                  </CodeLine>
                  
                  <CodeLine sx={{ color: "#10b981" }}>
                    ✓ Fetching secure playground templates... [Done]
                  </CodeLine>

                  <Box sx={{ bgcolor: "rgba(30, 41, 59, 0.3)", border: "1px solid #1e293b", p: 1.5, borderRadius: "6px", my: 1 }}>
                    <CodeLine sx={{ color: "#e2e8f0", mb: 0.5 }}>
                      <span style={{ color: "#f43f5e" }}>const</span> sandbox = <span style={{ color: "#a855f7" }}>await</span> CodeCraft.<span style={{ color: "#60a5fa" }}>forge</span>({"{"}
                    </CodeLine>
                    <CodeLine sx={{ color: "#e2e8f0", pl: 2 }}>
                      runtime: <span style={{ color: "#eab308" }}>'v8-isolated'</span>,
                    </CodeLine>
                    <CodeLine sx={{ color: "#e2e8f0", pl: 2 }}>
                      autoDeploy: <span style={{ color: "#eab308" }}>true</span>
                    </CodeLine>
                    <CodeLine sx={{ color: "#e2e8f0" }}>
                      {"}"});
                    </CodeLine>
                  </Box>

                  <CodeLine sx={{ color: "#64748b" }}>
                    $ sandbox --execute matrix_multiply.rs
                  </CodeLine>

                  <CodeLine sx={{ color: "#f59e0b" }}>
                    [info] Allocating edge memory loops...
                  </CodeLine>

                  <CodeLine sx={{ color: "#10b981", fontWeight: 600 }}>
                    <CheckCircleOutlineIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: "middle" }} />
                    Success: Compiled in 0.04ms onto edge matrix.
                  </CodeLine>

                  <CodeLine sx={{ color: "#ffffff" }}>
                    codecraft@grid-node-1:~<Cursor />
                  </CodeLine>
                </Stack>
              </TerminalBody>
            </TerminalFrame>
          </Box>
        </Box>
      </Container>
    </LandingWrapper>
  );
}

export default LandingPage;