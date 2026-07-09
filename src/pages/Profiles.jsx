import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  alpha,
  Container,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import NavBar from "../components/NavBar";
import { Line } from "react-chartjs-2";
import { Link } from "../styledComponents/StyledComp";
import {
  CameraAlt as CameraAltIcon,
  Terminal as TerminalIcon,
  ShowChart as ChartIcon,
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

import {
  ProfileWrapper,
  GlassCard,
  SidebarCard,
} from "../styledComponents/ProfileStyle";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Profiles() {
  const userId = useSelector((state) => state.auth.user._id);
  const avatarUrl = useSelector((state) => state.auth.user.avatarUrl);

  const [userData, setUserData] = useState(null);
  const [avatar, setAvatar] = useState(avatarUrl);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const config = {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        };

        const res = await axios.get(
          `${apiUrl}/user/getUserDetails/${userId}`,
          config
        );

        setUserData(res.data.user);
        setAvatar(res.data.user.avatarUrl || avatarUrl);
      } catch (error) {
        toast.error("Failed to sync profile.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUserDetails();
  }, [userId, avatarUrl]);

  // ---------------- Avatar Upload ----------------

  const handleAvatar = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        `${apiUrl}/user/upload-avatar`,
        formData,
        config
      );

      setAvatar(data.avatarUrl);

      setUserData((prev) => ({
        ...prev,
        avatarUrl: data.avatarUrl,
      }));

      toast.success("Avatar updated successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed.");
    }
  };

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
    datasets: [
      {
        label: "Problems Solved",
        data: solvedChart,
        borderColor: "#10b981",
        borderWidth: 4,
        pointBackgroundColor: "#10b981",
        pointBorderColor: "#fff",
        pointHoverRadius: 8,
        tension: 0.4,
        fill: true,

        backgroundColor: (context) => {
          const ctx = context.chart.ctx;

          const gradient = ctx.createLinearGradient(0, 0, 0, 300);

          gradient.addColorStop(0, alpha("#10b981", 0.35));
          gradient.addColorStop(1, "transparent");

          return gradient;
        },
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        backgroundColor: "#0b111e",
        borderColor: "#1e293b",
        borderWidth: 1,
        displayColors: false,

        titleFont: {
          family: "monospace",
          size: 14,
        },

        bodyFont: {
          family: "monospace",
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        grid: {
          color: "rgba(255,255,255,.05)",
        },

        ticks: {
          color: "#64748b",
          stepSize: 1,
        },
      },

      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#94a3b8",
          font: {
            weight: "bold",
          },
        },
      },
    },
  };
  return (
  <ProfileWrapper>
    <NavBar />

    <Container
      maxWidth="xl"
      sx={{
        mt: { xs: 2, md: 5 },
        pb: { xs: 4, md: 10 },
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Grid container spacing={{ xs: 3, md: 4 }}>

        {/* ================= Sidebar ================= */}

        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
          <SidebarCard
            isMobile={isMobile}
            sx={{
              p: { xs: 2.5, md: 3 },
            }}
          >
            <Box
              position="relative"
              sx={{
                mb: 3,
              }}
            >
              <Avatar
                src={avatar}
                sx={{
                  width: { xs: 110, sm: 130, md: 150 },
                  height: { xs: 110, sm: 130, md: 150 },

                  border: "4px solid #10b981",

                  boxShadow:
                    "0 0 35px rgba(16,185,129,.35)",

                  transition: ".3s",

                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              />

              <IconButton
                component="label"
                sx={{
                  position: "absolute",
                  right: 5,
                  bottom: 5,

                  bgcolor: "#10b981",
                  color: "#050810",

                  width: 40,
                  height: 40,

                  transition: ".25s",

                  "&:hover": {
                    bgcolor: "#059669",
                    transform: "scale(1.08)",
                  },
                }}
              >
                <CameraAltIcon fontSize="small" />

                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={handleAvatar}
                />
              </IconButton>
            </Box>

            <Typography
              variant={isMobile ? "h6" : "h5"}
              sx={{
                fontWeight: 800,
                textAlign: "center",
                wordBreak: "break-word",
              }}
            >
              {userData.username}
            </Typography>

            <Typography
              sx={{
                color: "#94a3b8",
                fontSize: ".85rem",
                mt: .5,
                mb: 4,
                textAlign: "center",
                wordBreak: "break-word",
              }}
            >
              {userData.email}
            </Typography>

            {/* ================= Stats ================= */}

            <GlassCard
              sx={{
                width: "100%",
                mb: 3,
                p: 2.5,
                background: "#0b111e",
                border: "1px solid #1e293b",
              }}
            >
              <Typography
                sx={{
                  color: "#64748b",
                  fontSize: ".75rem",
                  letterSpacing: "2px",
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                TOTAL PROBLEMS SOLVED
              </Typography>

              <Typography
                sx={{
                  textAlign: "center",
                  color: "#10b981",
                  fontWeight: 900,
                  fontSize: {
                    xs: "2rem",
                    md: "2.6rem",
                  },
                }}
              >
                {userData.problemSolved?.length || 0}
              </Typography>
            </GlassCard>

            {/* ================= Languages ================= */}

            <GlassCard
              sx={{
                width: "100%",
                background: "#0b111e",
                border: "1px solid #1e293b",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography
                  sx={{
                    color: "#94a3b8",
                    fontWeight: 700,
                    fontSize: ".75rem",
                    letterSpacing: "2px",
                  }}
                >
                  LANGUAGES
                </Typography>

                <LanguageModal />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                {userData.languages?.length > 0 ? (
                  userData.languages.map((lang) => (
                    <Box
                      key={lang}
                      sx={{
                        px: 1.5,
                        py: .6,

                        borderRadius: "8px",

                        background:
                          "rgba(16,185,129,.08)",

                        border:
                          "1px solid rgba(16,185,129,.25)",

                        transition: ".25s",

                        "&:hover": {
                          background:
                            "rgba(16,185,129,.15)",
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#10b981",
                          fontWeight: 700,
                          fontSize: ".78rem",
                        }}
                      >
                        {lang}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography
                    sx={{
                      color: "#64748b",
                      fontSize: ".85rem",
                    }}
                  >
                    No languages added.
                  </Typography>
                )}
              </Box>
            </GlassCard>
          </SidebarCard>
        </Grid>

        {/* ================= Right Section ================= */}

        <Grid size={{ xs: 12, md: 8, lg: 9 }}>
          <Stack spacing={4}>
                        {/* ================= Progress Chart ================= */}

            <GlassCard
              sx={{
                p: { xs: 2, md: 3 },
                background: "#090d16",
                border: "1px solid #1e293b",
                minHeight: { xs: 300, md: 420 },
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  color: "#94a3b8",
                  fontWeight: 700,
                  mb: 3,
                  letterSpacing: "1px",
                }}
              >
                <ChartIcon sx={{ color: "#10b981" }} />
                PROBLEM SOLVING ANALYTICS
              </Typography>

              <Box
                sx={{
                  width: "100%",
                  height: {
                    xs: 220,
                    sm: 260,
                    md: 320,
                  },
                }}
              >
                <Line
                  data={lineData}
                  options={lineOptions}
                />
              </Box>
            </GlassCard>

            {/* ================= Solved Problems ================= */}

            <Box>

              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 3,
                  color: "#f8fafc",
                  fontWeight: 700,
                  letterSpacing: "1px",
                }}
              >
                <TerminalIcon sx={{ color: "#10b981" }} />

                SOLVED PROBLEMS
              </Typography>

              <Stack spacing={2}>

                {solvedList.length > 0 ? (

                  solvedList.map((prob) => (

                    <Link
                      key={prob.id}
                      to={`/problems/${prob.id}`}
                      style={{
                        textDecoration: "none",
                      }}
                    >

                      <GlassCard
                        sx={{
                          background: "#090d16",
                          border: "1px solid #1e293b",
                          transition: ".25s",

                          "&:hover": {
                            transform: "translateY(-3px)",
                            borderColor: "#10b981",
                            boxShadow:
                              "0 10px 30px rgba(16,185,129,.15)",
                          },
                        }}
                      >

                        <Box
                          sx={{
                            display: "flex",

                            flexDirection: {
                              xs: "column",
                              sm: "row",
                            },

                            justifyContent: "space-between",

                            alignItems: {
                              xs: "flex-start",
                              sm: "center",
                            },

                            gap: 2,
                          }}
                        >

                          <Box>

                            <Typography
                              sx={{
                                color: "#10b981",
                                fontWeight: 700,
                                fontSize: ".8rem",
                                mb: .5,
                              }}
                            >
                              #{prob.id}
                            </Typography>

                            <Typography
                              sx={{
                                color: "#f8fafc",
                                fontWeight: 600,
                                fontSize: {
                                  xs: ".95rem",
                                  md: "1rem",
                                },
                              }}
                            >
                              {prob.title}
                            </Typography>

                          </Box>

                          <Box
                            sx={{
                              px: 2,
                              py: .8,
                              borderRadius: "999px",

                              border: `1px solid ${
                                prob.difficulty === "Easy"
                                  ? "#10b981"
                                  : prob.difficulty === "Medium"
                                  ? "#f59e0b"
                                  : "#ef4444"
                              }`,

                              background:
                                prob.difficulty === "Easy"
                                  ? "rgba(16,185,129,.08)"
                                  : prob.difficulty === "Medium"
                                  ? "rgba(245,158,11,.08)"
                                  : "rgba(239,68,68,.08)",
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 700,
                                fontSize: ".75rem",

                                color:
                                  prob.difficulty === "Easy"
                                    ? "#10b981"
                                    : prob.difficulty === "Medium"
                                    ? "#f59e0b"
                                    : "#ef4444",
                              }}
                            >
                              {prob.difficulty.toUpperCase()}
                            </Typography>
                          </Box>

                        </Box>

                      </GlassCard>

                    </Link>

                  ))

                ) : (

                  <GlassCard
                    sx={{
                      background: "#090d16",
                      border: "1px dashed #1e293b",
                      textAlign: "center",
                      py: 8,
                    }}
                  >

                    <TerminalIcon
                      sx={{
                        color: "#334155",
                        fontSize: 50,
                        mb: 2,
                      }}
                    />

                    <Typography
                      sx={{
                        color: "#64748b",
                        fontFamily: "monospace",
                      }}
                    >
                      No problems solved yet.
                    </Typography>

                  </GlassCard>

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
          