import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  styled,
  alpha,
  Container,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import NavBar from "../components/NavBar";
import { Line } from "react-chartjs-2";
import { Link } from "../components/StyledComp";
import { 
  CameraAlt as CameraAltIcon, 
  Terminal as TerminalIcon, 
  ShowChart as ChartIcon,
  Code as CodeIcon
} from "@mui/icons-material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import axios from "axios";
import problems from "../fakeData/problems";
import { useSelector } from "react-redux";
import { VisuallyHiddenInput } from "../components/helper/Styled";
import toast from "react-hot-toast";
import LanguageModal from "../components/LanguageModel";
import Loader from "../components/loader/Loader";

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler
);

const ProfileWrapper = styled(Box)({
  minHeight: "100vh",
  backgroundColor: "#020617",
  backgroundImage: `radial-gradient(circle at 50% -10%, rgba(99, 102, 241, 0.15) 0%, transparent 60%)`,
  color: "#ffffff",
});

const GlassCard = styled(Paper)(({ theme }) => ({
  background: alpha("#0f172a", 0.7),
  backdropFilter: "blur(20px)",
  borderRadius: "24px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
  padding: theme.spacing(3),
  color: "#fff",
  overflow: "hidden"
}));

const SidebarCard = styled(GlassCard)(({ isMobile }) => ({
  position: isMobile ? "relative" : "sticky",
  top: "84px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

function Profiles() {
  const userId = useSelector((state) => state.auth.user._id);
  const avatarUrl = useSelector((state) => state.auth.user.avatarUrl);
  
  const [userData, setUserData] = useState(null);
  const [avatar, setAvatar] = useState(avatarUrl);
  const [loading, setLoading] = useState(true);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const config = {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        };
        const res = await axios.get(`https://codecraft-sr3j.onrender.com/user/getUserDetails/${userId}`, config);
        setUserData(res.data.user);
        setAvatar(res.data.user.avatarUrl || avatarUrl);
      } catch (error) {
        toast.error("Failed to sync profile data");
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchUserDetails();
  }, [userId, avatarUrl]);

  if (loading || !userData) return <Loader />;

  const solvedChart = [0, 0, 0];
  const solvedList = [];
  userData.problemSolved?.forEach((id) => {
    const prob = problems.find((p) => p.id === id);
    if (prob) {
      solvedList.push(prob);
      if (prob.difficulty === "Easy") solvedChart[0]++;
      else if (prob.difficulty === "Medium") solvedChart[1]++;
      else solvedChart[2]++;
    }
  });

  const lineData = {
    labels: ["EASY", "MEDIUM", "HARD"],
    datasets: [{
      label: "Modules Resolved",
      data: solvedChart,
      borderColor: "#6366f1",
      borderWidth: 4,
      pointBackgroundColor: "#6366f1",
      pointBorderColor: "#fff",
      pointHoverRadius: 8,
      tension: 0.4, 
      fill: true,
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, alpha("#6366f1", 0.3));
        gradient.addColorStop(1, "transparent");
        return gradient;
      },
    }],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1e293b",
        titleFont: { family: "monospace", size: 14 },
        bodyFont: { family: "monospace" },
        padding: 12,
        displayColors: false,
      }
    },
    scales: {
      y: { 
        beginAtZero: true, 
        grid: { color: "rgba(255,255,255,0.05)", drawBorder: false },
        ticks: { color: "#64748b", font: { family: "monospace" }, stepSize: 1 } 
      },
      x: { 
        grid: { display: false },
        ticks: { color: "#64748b", font: { family: "monospace", weight: "bold" } } 
      },
    },
  };

  return (
    <ProfileWrapper>
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: 5, pb: 10 }}>
        <Grid container spacing={4}>

          <Grid size={{ xs: 12, md: 3 }}>
            <SidebarCard isMobile={isMobile}>
              <Box position="relative" sx={{ mb: 3 }}>
                <Avatar 
                  sx={{ 
                    width: 140, height: 140, 
                    border: "4px solid #6366f1",
                    boxShadow: "0 0 30px rgba(99, 102, 241, 0.4)" 
                  }} 
                  src={avatar} 
                />
                <IconButton
                  component="label"
                  sx={{ 
                    position: "absolute", bottom: 5, right: 5, 
                    bgcolor: "#6366f1", "&:hover": { bgcolor: "#4f46e5", transform: "scale(1.1)" } 
                  }}
                >
                  <CameraAltIcon fontSize="small" sx={{ color: "white" }} />
                  <VisuallyHiddenInput type="file" onChange={(e) => {/* handleAvatar logic */}} />
                </IconButton>
              </Box>

              <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: "-0.5px" }}>
                {userData.username.toUpperCase()}
              </Typography>
              <Typography variant="caption" sx={{ color: "#64748b", mb: 4, fontFamily: "monospace" }}>
                {userData.email}
              </Typography>

              <Box sx={{ width: "100%", textAlign: "center", mb: 4 }}>
                  <Typography variant="caption" sx={{ color: "#475569", fontWeight: 800, display: "block", mb: 0.5 }}>TOTAL_RESOLVED</Typography>
                  <Typography variant="h4" sx={{ color: "#6366f1", fontWeight: 900, lineHeight: 1 }}>{userData.problemSolved?.length || 0}</Typography>
              </Box>

              <Box sx={{ width: "100%", textAlign: "left" }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="caption" sx={{ fontWeight: 900, color: "#475569" }}>LANGUAGES</Typography>
                  <LanguageModal />
                </Box>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {userData.languages?.map(lang => (
                    <Box key={lang} sx={{ 
                      bgcolor: alpha("#6366f1", 0.1), px: 1.5, py: 0.5, 
                      borderRadius: "6px", border: "1px solid rgba(99, 102, 241, 0.2)"
                    }}>
                      <Typography variant="caption" sx={{ color: "#a5b4fc", fontWeight: "bold" }}>{lang}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </SidebarCard>
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            <Stack spacing={4}>

              <GlassCard sx={{ minHeight: 420 }}>
                <Typography variant="subtitle2" sx={{ mb: 4, fontWeight: 900, color: "#94a3b8", display: "flex", alignItems: "center", gap: 1.5 }}>
                  <ChartIcon sx={{ color: "#6366f1", fontSize: 20 }} /> MASTERY_ASCENSION_CURVE
                </Typography>
                <Box sx={{ height: 320 }}>
                  <Line data={lineData} options={lineOptions} />
                </Box>
              </GlassCard>

              <Box>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 900, display: "flex", alignItems: "center", gap: 2 }}>
                  <TerminalIcon sx={{ color: "#6366f1" }} /> RESOLVED_LOG
                </Typography>
                <Stack spacing={2}>
                  {solvedList.length > 0 ? (
                    solvedList.map((prob) => (
                      <Link key={prob.id} to={`/problems/${prob.id}`} style={{ textDecoration: 'none' }}>
                        <GlassCard sx={{ 
                          p: "18px 24px", display: "flex", justifyContent: "space-between", 
                          alignItems: "center", background: alpha("#0f172a", 0.4),
                          "&:hover": { background: alpha("#6366f1", 0.08), transform: "translateX(10px)" }
                        }}>
                          <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: "monospace" }}>
                            <span style={{ color: "#6366f1", marginRight: "16px" }}>#{prob.id}</span> {prob.title}
                          </Typography>
                          <Box sx={{ 
                            px: 2, py: 0.5, borderRadius: "50px", 
                            bgcolor: alpha(prob.difficulty === "Easy" ? "#10b981" : prob.difficulty === "Medium" ? "#f59e0b" : "#ef4444", 0.1),
                            border: `1px solid ${alpha(prob.difficulty === "Easy" ? "#10b981" : prob.difficulty === "Medium" ? "#f59e0b" : "#ef4444", 0.4)}`
                          }}>
                            <Typography sx={{ 
                              fontSize: "0.65rem", fontWeight: 900, letterSpacing: '1px',
                              color: prob.difficulty === "Easy" ? "#10b981" : prob.difficulty === "Medium" ? "#f59e0b" : "#ef4444"
                            }}>
                              {prob.difficulty.toUpperCase()}
                            </Typography>
                          </Box>
                        </GlassCard>
                      </Link>
                    ))
                  ) : (
                    <Typography variant="body2" sx={{ color: "#475569", textAlign: "center", fontStyle: "italic" }}>
                      No logs found. Awaiting core execution...
                    </Typography>
                  )}
                </Stack>
              </Box>
            </Stack>
          </Grid>

        </Grid>
      </Container>
    </ProfileWrapper>
  );
}

export default Profiles;