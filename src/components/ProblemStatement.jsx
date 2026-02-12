import { Box, Button, IconButton, Typography, alpha, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useParams } from "react-router";
import axios from "axios";

const ScrollContainer = styled(Box)(({ theme }) => ({
  height: `calc(100vh - 64px)`,
  overflowY: "auto",
  padding: theme.spacing(3),
  background: "#020617",
  backgroundImage: `radial-gradient(circle at 0% 0%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)`,
  color: "#ffffff",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": { display: "none" }, 
  msOverflowStyle: "none",
}));

const StyledButton = styled(Button)({
  backgroundColor: alpha("#1e293b", 0.8),
  color: "#94a3b8",
  fontSize: "0.75rem",
  fontWeight: 700,
  textTransform: "none",
  borderRadius: "8px",
  padding: "6px 16px",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  "&:hover": {
    backgroundColor: "#6366f1",
    color: "#fff",
  },
});

const ExampleBox = styled(Box)({
  backgroundColor: alpha("#0f172a", 0.5),
  backdropFilter: "blur(10px)",
  padding: "16px",
  marginTop: "16px",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  fontFamily: "monospace",
});

function ProblemStatement({ problemData, setIsSubmission }) {
  const [likes, setLikes] = useState(problemData?.likes?.length || 0);
  const [disLikes, setDisLikes] = useState(problemData?.dislikes?.length || 0);
  const { problemId } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const getData = async () => {
      try {
        const response = await axios.get(`https://codecraft-sr3j.onrender.com/problems/getLikes/${problemId}`, config);
        setLikes(response.data.likes);
        setIsLiked(response.data.userLike);
        setDisLikes(response.data.dislikes);
        setIsDisLiked(response.data.userDislike);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    const getSolvedStatus = async () => {
      try {
        const response = await axios.get(`https://codecraft-sr3j.onrender.com/problems/getSolved/${problemId}`, config);
        setIsSolved(response.data.solved);
      } catch (error) {
        console.error("Error fetching solved status:", error);
      }
    };

    if (problemId) {
      getData();
      getSolvedStatus();
    }
  }, [problemId]);

  const handleLikes = async () => {
    const prevLiked = isLiked;
    setIsLiked(!isLiked);
    setLikes(prevLiked ? likes - 1 : likes + 1);
    try {
      await axios.post(`https://codecraft-sr3j.onrender.com/problems/like/${problemData._id}`, {}, { withCredentials: true });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisLikes = async () => {
    const prevDisLiked = isDisLiked;
    setIsDisLiked(!isDisLiked);
    setDisLikes(prevDisLiked ? disLikes - 1 : disLikes + 1);
    try {
      await axios.post(`https://codecraft-sr3j.onrender.com/problems/dislike/${problemData._id}`, {}, { withCredentials: true });
    } catch (error) {
      console.error(error);
    }
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case "Easy": return "#4ade80"; 
      case "Medium": return "#fbbf24"; 
      case "Hard": return "#f87171";
      default: return "#fbbf24";
    }
  };

  return (
    <ScrollContainer>
      <Box sx={{ display: "flex", gap: 1.5, mb: 4 }}>
        <StyledButton onClick={() => setIsSubmission(false)}>Description</StyledButton>
        <StyledButton>Solution</StyledButton>
        <StyledButton onClick={() => setIsSubmission(true)}>Submission</StyledButton>
      </Box>
      <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: "-1px", mb: 2 }}>
        {problemData.title}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 4 }}>
        <Typography sx={{ color: getDifficultyColor(problemData.difficulty), fontWeight: 800, fontSize: "0.85rem" }}>
          {problemData.difficulty?.toUpperCase()}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <IconButton onClick={handleLikes} size="small">
            <ThumbUpIcon sx={{ color: isLiked ? "#6366f1" : "#475569", fontSize: 18 }} />
          </IconButton>
          <Typography variant="body2" sx={{ color: "#94a3b8" }}>{likes}</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <IconButton onClick={handleDisLikes} size="small">
            <ThumbDownAltIcon sx={{ color: isDisLiked ? "#f87171" : "#475569", fontSize: 18 }} />
          </IconButton>
          <Typography variant="body2" sx={{ color: "#94a3b8" }}>{disLikes}</Typography>
        </Box>

        {isSolved && <DoneAllIcon sx={{ color: "#4ade80", fontSize: 20 }} />}
      </Box>
      <Box sx={{ maxWidth: "800px" }}>
        <Typography variant="body1" sx={{ color: "#cbd5e1", lineHeight: 1.7, mb: 4 }}>
          {problemData.description}
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: "1rem" }}>
          Examples
        </Typography>
        
        {problemData?.examples?.map((example, index) => (
          <ExampleBox key={index}>
            <Typography variant="body2" sx={{ color: "#6366f1", fontWeight: "bold", mb: 1 }}>
              Example {index + 1}
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", mb: 0.5 }}>
              <span style={{ color: "#64748b" }}>Input:</span> {example.input}
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", mb: 0.5 }}>
              <span style={{ color: "#64748b" }}>Output:</span> {example.output}
            </Typography>
            {example.explanation && (
              <Typography variant="body2" sx={{ color: "#94a3b8", mt: 1, fontStyle: "italic" }}>
                Explanation: {example.explanation}
              </Typography>
            )}
          </ExampleBox>
        ))}

        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: "1rem" }}>
            Constraints
          </Typography>
          {problemData?.constraints?.map((constraint, index) => (
            <Box key={index} sx={{ display: "flex", gap: 1, mb: 1 }}>
              <Typography sx={{ color: "#6366f1" }}>•</Typography>
              <Typography variant="body2" sx={{ 
                color: "#94a3b8", 
                fontFamily: "monospace",
                backgroundColor: alpha("#1e293b", 0.5),
                px: 1,
                borderRadius: "4px"
              }}>
                {constraint}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </ScrollContainer>
  );
}

export default ProblemStatement;