import { Avatar, Box, Typography, alpha, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";
import problems from "../fakeData/problems";
import axios from "axios";
import {COLORS, ProfileGlassPaper} from "../styledComponents/StyledComp.jsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

// ---------- Colors ----------


function Profile() {
  const userId = useSelector((state) => state.auth.user._id);
  const avatarUrl = useSelector((state) => state.auth.user.avatarUrl);

  const [userData, setUserData] = useState({});

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const config = {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.get(
          `${apiUrl}/user/getUserDetails/${userId}`,
          config,
        );

        setUserData(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    if (userId) fetchUserDetails();
  }, [userId]);

  const solvedChart = [0, 0, 0];

  userData.problemSolved?.forEach((problemId) => {
    const prob = problems.find((p) => p.id === problemId);

    if (!prob) return;

    if (prob.difficulty === "Easy") solvedChart[0]++;
    else if (prob.difficulty === "Medium") solvedChart[1]++;
    else solvedChart[2]++;
  });

  const barData = {
    labels: ["EASY", "MED", "HARD"],

    datasets: [
      {
        data: solvedChart,

        backgroundColor: [
          alpha(COLORS.easy, 0.7),
          alpha(COLORS.medium, 0.7),
          alpha(COLORS.hard, 0.7),
        ],

        borderColor: [COLORS.easy, COLORS.medium, COLORS.hard],

        borderRadius: 6,
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      title: {
        display: true,
        text: "ANALYTICS",

        color: COLORS.gray,

        font: {
          size: 11,
          weight: "800",
          family: "Fira Code",
        },

        align: "start",
      },

      tooltip: {
        backgroundColor: COLORS.card,

        borderColor: COLORS.border,
        borderWidth: 1,

        titleFont: {
          family: "Fira Code",
        },

        bodyFont: {
          family: "Fira Code",
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        ticks: {
          color: COLORS.gray,
        },

        grid: {
          color: COLORS.border,
        },
      },

      x: {
        ticks: {
          color: COLORS.gray,

          font: {
            weight: "bold",
          },
        },

        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <ProfileGlassPaper>
      <Box
        sx={{
          p: 3,
          textAlign: "center",
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        <Avatar
          src={avatarUrl}
          sx={{
            width: 84,
            height: 84,

            mx: "auto",

            border: `2px solid ${COLORS.primary}`,

            boxShadow: "0 0 20px rgba(16,185,129,.25)",
          }}
        />

        <Typography
          variant="subtitle1"
          sx={{
            mt: 2,

            fontWeight: 800,

            color: COLORS.white,

            letterSpacing: "-.5px",
          }}
        >
          {userData.username || "GUEST_USER"}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            color: COLORS.gray,

            display: "block",

            fontFamily: "'Fira Code', monospace",

            mt: 0.5,
          }}
        >
          {userData.email}
        </Typography>

        <Box
          sx={{
            mt: 3,
            height: 180,
          }}
        >
          <Bar data={barData} options={chartOptions} />
        </Box>

        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "space-around",
            pt: 2,
            borderTop: `1px solid ${COLORS.border}`,
          }}
        >
          <StatBox label="TOTAL" value={userData.problemSolved?.length || 0} />

          <StatBox label="RANK" value="#--" />
        </Box>
      </Box>
    </ProfileGlassPaper>
  );
}

const StatBox = ({ label, value }) => (
  <Box
    sx={{
      textAlign: "center",
      minWidth: 80,
    }}
  >
    <Typography
      variant="caption"
      sx={{
        color: COLORS.darkGray,
        display: "block",
        fontFamily: "'Fira Code', monospace",
        fontWeight: 700,
        letterSpacing: "1px",
        textTransform: "uppercase",
      }}
    >
      {label}
    </Typography>

    <Typography
      variant="h6"
      sx={{
        mt: 0.5,
        fontWeight: 800,
        background:
          "linear-gradient(120deg,#10b981 0%,#059669 45%,#2563eb 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontFamily: "'Fira Code', monospace",
      }}
    >
      {value}
    </Typography>
  </Box>
);

export default Profile;
