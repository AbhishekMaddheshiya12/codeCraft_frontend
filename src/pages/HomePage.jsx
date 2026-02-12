import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  styled,
  alpha,
} from "@mui/material";
import NavBar from "../components/NavBar";
import CodeIcon from "@mui/icons-material/Code";
import ForumIcon from "@mui/icons-material/Forum";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import SchoolIcon from "@mui/icons-material/School";
import TerminalIcon from "@mui/icons-material/Terminal";
import { useNavigate } from "react-router";

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  background: alpha("#1A2B4A", 0.2),
  backdropFilter: "blur(10px)",
  border: `1px solid ${alpha("#58a6ff", 0.2)}`,
  borderRadius: "20px",
  color: "#fff",
  minHeight: 280,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: `0 0 30px ${alpha("#58a6ff", 0.3)}`,
    borderColor: "#58a6ff",
    background: alpha("#1A2B4A", 0.4),
  },
}));

const HeroSection = styled(Box)(({ theme }) => ({
  background: "radial-gradient(circle at 50% 50%, #1A2B4A 0%, #050a14 100%)",
  color: "white",
  padding: theme.spacing(20, 0, 15),
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')",
    opacity: 0.1,
  },
}));

const GlowButton = styled(Button)(({ theme }) => ({
  borderRadius: "50px",
  padding: "12px 35px",
  textTransform: "none",
  fontSize: "1.1rem",
  fontWeight: 600,
  transition: "all 0.3s ease",
  "&.MuiButton-contained": {
    backgroundColor: "#58a6ff",
    boxShadow: `0 0 15px ${alpha("#58a6ff", 0.5)}`,
    "&:hover": {
      backgroundColor: "#1f6feb",
      boxShadow: `0 0 25px ${alpha("#58a6ff", 0.8)}`,
    },
  },
  "&.MuiButton-outlined": {
    borderWidth: "2px",
    borderColor: alpha("#58a6ff", 0.5),
    "&:hover": {
      borderWidth: "2px",
      backgroundColor: alpha("#58a6ff", 0.1),
    },
  },
}));

function HomePage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: "#050a14", color: "white", minHeight: "100vh" }}>
      <NavBar />

      <HeroSection>
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2.8rem", md: "4.5rem" },
              letterSpacing: "-0.02em",
              mb: 2,
              background: "linear-gradient(to right, #fff, #58a6ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Code the Future.
          </Typography>
          
          <Typography
            variant="h5"
            sx={{
              color: alpha("#fff", 0.7),
              mb: 5,
              maxWidth: "600px",
              mx: "auto",
              fontWeight: 300,
              lineHeight: 1.6,
            }}
          >
            The ultimate ecosystem for developers to master modern tech through 
            high-fidelity simulation and neural-pathway learning.
          </Typography>

          <Box sx={{ display: "flex", gap: 3, justifyContent: "center", mb: 8 }}>
            <GlowButton variant="contained" onClick={() => navigate("/authentication")}>
              Initialize Session
            </GlowButton>
            <GlowButton variant="outlined" color="inherit">
              Explore Tech Stack
            </GlowButton>
          </Box>

          <Grid container spacing={4} sx={{ mt: 5 }}>
            {[
              { label: "Algorithms", val: "200+" },
              { label: "Kernels", val: "25" },
              { label: "Users", val: "50K" },
              { label: "Latency", val: "0ms" },
            ].map((stat, i) => (
              <Grid item xs={6} sm={3} key={i}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: "#58a6ff" }}>
                  {stat.val}
                </Typography>
                <Typography variant="overline" sx={{ opacity: 0.6, letterSpacing: 2 }}>
                  {stat.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Box sx={{ textAlign: "center", mb: 10 }}>
          <Typography variant="overline" sx={{ color: "#58a6ff", fontWeight: 700, letterSpacing: 3 }}>
            System Capabilities
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 700, mt: 1 }}>
            Engineered for Excellence
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {[
            { icon: <CodeIcon />, title: "Quantum IDE", desc: "Low-latency browser-based compiler with AI-driven autocompletion." },
            { icon: <ForumIcon />, title: "Neural Network", desc: "Collaborative knowledge sharing through decentralized forums." },
            { icon: <TrackChangesIcon />, title: "Bio-Metrics", desc: "Advanced progress visualization with predictive skill-mapping." },
            { icon: <SchoolIcon />, title: "The Academy", desc: "Curated learning paths designed by industry architects." },
          ].map((feat, i) => (
            <Grid item xs={12} md={6} lg={3} key={i}>
              <FeatureCard elevation={0}>
                <Box sx={{ color: "#58a6ff", fontSize: 50, mb: 2 }}>{feat.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  {feat.title}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  {feat.desc}
                </Typography>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ py: 10, background: alpha("#1A2B4A", 0.1) }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={5}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
                Zero Latency. <br />
                <Box component="span" sx={{ color: "#58a6ff" }}>Pure Logic.</Box>
              </Typography>
              <Typography sx={{ opacity: 0.8, mb: 4, fontSize: "1.1rem" }}>
                Our cloud-native environment bridges the gap between learning and production. 
                Experience the snap of a local terminal with the power of the cloud.
              </Typography>
              <GlowButton variant="contained" startIcon={<TerminalIcon />}>
                Launch Terminal
              </GlowButton>
            </Grid>
            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  bgcolor: "#0d1117",
                  borderRadius: "12px",
                  p: 3,
                  border: "1px solid #30363d",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                  fontFamily: "'Fira Code', monospace",
                  position: "relative",
                }}
              >
                <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#ff5f56" }} />
                  <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#ffbd2e" }} />
                  <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#27c93f" }} />
                </Box>
                
                <Box sx={{ color: "#c9d1d9", fontSize: "0.9rem" }}>
                  <span style={{ color: "#ff7b72" }}>const</span> <span style={{ color: "#d2a8ff" }}>decryptNeuralPath</span> = (data) {"=>"} {"{"} <br />
                  &nbsp;&nbsp;<span style={{ color: "#ff7b72" }}>return</span> data.<span style={{ color: "#79c0ff" }}>map</span>(node {"=>"} {"{"} <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#ff7b72" }}>if</span> (node.status === <span style={{ color: "#a5d6ff" }}>'encrypted'</span>) {"{"} <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#ff7b72" }}>return</span> {"{ ...node, status: 'ready' }"}; <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;{"}"} <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#8b949e" }}>// Process signals</span> <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#ff7b72" }}>return</span> node; <br />
                  &nbsp;&nbsp;{"}"}); <br />
                  {"}"};
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: 15, textAlign: "center" }}>
        <Container maxWidth="sm">
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 3 }}>
            Ready to Evolve?
          </Typography>
          <Typography sx={{ opacity: 0.6, mb: 5 }}>
            Join the collective of 50,000+ developers shaping the next generation of software.
          </Typography>
          <GlowButton variant="contained">Join the Network</GlowButton>
        </Container>
      </Box>
    </Box>
  );
}

export default HomePage;