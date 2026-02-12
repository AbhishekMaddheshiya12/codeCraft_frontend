import { Avatar, Box, Paper, Typography, alpha, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from "chart.js";
import { useSelector } from "react-redux";
import problems from "../fakeData/problems";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProfileGlassPaper = styled(Box)(({ theme }) => ({
  background: "transparent",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
}));

function Profile() {
  const userId = useSelector(state => state.auth.user._id);
  const avatarUrl = useSelector(state => state.auth.user.avatarUrl);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const config = {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }, 
        };
        const response = await axios.get(`https://codecraft-sr3j.onrender.com/user/getUserDetails/${userId}`, config);
        setUserData(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    if (userId) fetchUserDetails();
  }, [userId]); 

  const solvedChart = [0, 0, 0];
  userData.problemSolved?.forEach((problemId) => {
    const prob = problems.find((p) => p.id === problemId);
    if (prob) {
      if (prob.difficulty === "Easy") solvedChart[0]++;
      else if (prob.difficulty === "Medium") solvedChart[1]++;
      else solvedChart[2]++;
    }
  });

  const barData = {
    labels: ["EASY", "MED", "HARD"],
    datasets: [{
      label: "Count",
      data: solvedChart,
      backgroundColor: [
        alpha("#4ade80", 0.6),
        alpha("#fbbf24", 0.6), 
        alpha("#f87171", 0.6) 
      ],
      borderColor: ["#4ade80", "#fbbf24", "#f87171"],
      borderWidth: 1,
      borderRadius: 4,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, 
      title: {
        display: true,
        text: "ANALYTICS",
        color: "#64748b",
        font: { size: 10, weight: "800", family: "monospace" },
        align: "start",
      },
      tooltip: {
        backgroundColor: "#0f172a",
        titleFont: { family: "monospace" },
        bodyFont: { family: "monospace" },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#475569", font: { size: 10 } },
        grid: { color: "rgba(255, 255, 255, 0.05)" },
      },
      x: {
        ticks: { color: "#64748b", font: { size: 10, weight: "bold" } },
        grid: { display: false },
      },
    },
  };

  return (
    <ProfileGlassPaper>
      <Box sx={{ p: 3, textAlign: "center", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
        <Avatar
          src={avatarUrl}
          sx={{
            width: 80,
            height: 80,
            margin: "0 auto",
            border: "2px solid #6366f1",
            boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
          }}
        />
        <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 800, letterSpacing: "-0.5px" }}>
          {userData.username || "GUEST_USER"}
        </Typography>
        <Typography variant="caption" sx={{ color: "#64748b", display: "block", mb: 1 }}>
          {userData.email}
        </Typography>
      </Box>

      <Box sx={{ p: 2 }}>
        <Box sx={{ height: "180px", width: "100%" }}>
          <Bar data={barData} options={chartOptions} />
        </Box>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-around' }}>
            <StatBox label="TOTAL" value={userData.problemSolved?.length || 0} />
            <StatBox label="RANK" value="#-- " />
        </Box>
      </Box>
    </ProfileGlassPaper>
  );
}

const StatBox = ({ label, value }) => (
    <Box sx={{ textAlign: 'center' }}>
        <Typography variant="caption" sx={{ color: '#475569', fontWeight: 800, display: 'block' }}>{label}</Typography>
        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#6366f1' }}>{value}</Typography>
    </Box>
);

export default Profile;