import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  styled,
  Stack,
  Container,
  Button,
} from "@mui/material";
import { keyframes } from "@mui/system";
import SecurityIcon from "@mui/icons-material/Security";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NavBar from "../components/NavBar";
import {
  ContestWrapper,
  MainContent,
  TechGridOverlay,
  CentralGlow,
  CyberTimerCard,
  TimeBox,
} from "../styledComponents/StyledComp";

const revealUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulseGlow = keyframes`
  0%, 100% { opacity: 0.15; transform: scale(1); }
  50% { opacity: 0.25; transform: scale(1.05); }
`;

function Contest() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {}, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ContestWrapper>
      <NavBar />

      <TechGridOverlay />
      <CentralGlow />
      <MainContent>
        <Container
          maxWidth="sm"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <CyberTimerCard>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2.5 }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: "10px",
                  bgcolor: "rgba(16, 185, 129, 0.08)",
                  border: "1px solid rgba(16, 185, 129, 0.25)",
                  display: "inline-flex",
                }}
              >
                <SecurityIcon sx={{ color: "#10b981", fontSize: 24 }} />
              </Box>
            </Box>

            <Typography
              variant="caption"
              sx={{
                fontFamily: "monospace",
                color: "#10b981",
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              [ system_event: algorithmic_forge ]
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "#ffffff",
                mt: 1,
                mb: 1.5,
                letterSpacing: "-0.5px",
              }}
            >
              Arena Matrix Loading
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "#64748b", mb: 4, maxWidth: "400px", mx: "auto" }}
            >
              The arena runtime structures are being compiled. Get ready to
              benchmark your syntax against developers globally.
            </Typography>

            <Stack direction="row" spacing={1.5} sx={{ mb: 4.5 }}>
              <TimeBox>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "#ffffff",
                  }}
                >
                  {String(timeLeft.days).padStart(2, "0")}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#475569", fontWeight: 700, fontSize: "0.7rem" }}
                >
                  DAYS
                </Typography>
              </TimeBox>

              <TimeBox>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "#ffffff",
                  }}
                >
                  {String(timeLeft.hours).padStart(2, "0")}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#475569", fontWeight: 700, fontSize: "0.7rem" }}
                >
                  HRS
                </Typography>
              </TimeBox>

              <TimeBox>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "#ffffff",
                  }}
                >
                  {String(timeLeft.minutes).padStart(2, "0")}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#475569", fontWeight: 700, fontSize: "0.7rem" }}
                >
                  MINS
                </Typography>
              </TimeBox>

              <TimeBox>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "#10b981",
                  }}
                >
                  {String(timeLeft.seconds).padStart(2, "0")}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#475569", fontWeight: 700, fontSize: "0.7rem" }}
                >
                  SECS
                </Typography>
              </TimeBox>
            </Stack>

            <Button
              variant="outlined"
              fullWidth
              startIcon={<NotificationsNoneIcon />}
              sx={{
                borderColor: "#1e293b",
                color: "#cbd5e1",
                textTransform: "none",
                borderRadius: "8px",
                py: 1.5,
                fontFamily: "'Fira Code', monospace",
                fontSize: "0.9rem",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "#334155",
                  bgcolor: "rgba(30, 41, 59, 0.2)",
                  color: "#10b981",
                },
              }}
            >
              Notify Node Deployment
            </Button>
          </CyberTimerCard>
        </Container>
      </MainContent>
    </ContestWrapper>
  );
}

export default Contest;
