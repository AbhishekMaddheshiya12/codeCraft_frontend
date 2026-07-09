import { Box, Button, IconButton, Typography, alpha,} from "@mui/material";
import React, { useEffect, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useParams } from "react-router-dom"; 
import axios from "axios";
import {ScrollContainer, StyledButton, ExampleBox} from "../styledComponents/StyledComp.jsx";

function ProblemStatement({ problemData, setIsSubmission }) {
  const [likes, setLikes] = useState(problemData?.likes?.length || 0);
  const [disLikes, setDisLikes] = useState(problemData?.dislikes?.length || 0);
  const { problemId } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const getData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/problems/getLikes/${problemId}`, config);
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
        const response = await axios.get(`${apiUrl}/problems/getSolved/${problemId}`, config);
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
      await axios.post(`${apiUrl}/problems/like/${problemData._id}`, {}, { withCredentials: true });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisLikes = async () => {
    const prevDisLiked = isDisLiked;
    setIsDisLiked(!isDisLiked);
    setDisLikes(prevDisLiked ? disLikes - 1 : disLikes + 1);
    try {
      await axios.post(`${apiUrl}/problems/dislike/${problemData._id}`, {}, { withCredentials: true });
    } catch (error) {
      console.error(error);
    }
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case "Easy": return "#10b981"; 
      case "Medium": return "#eab308"; 
      case "Hard": return "#f87171"; 
      default: return "#eab308";
    }
  };

  return (
    <ScrollContainer>
      <Box sx={{ display: "flex", gap: 1.5, mb: 4 }}>
        <StyledButton onClick={() => setIsSubmission(false)}>Description</StyledButton>
        <StyledButton>Solution</StyledButton>
        <StyledButton onClick={() => setIsSubmission(true)}>Submission</StyledButton>
      </Box>
      <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: "-0.04em", mb: 2, color: "#ffffff" }}>
        {problemData.title}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 4 }}>
        <Typography sx={{ color: getDifficultyColor(problemData.difficulty), fontWeight: 800, fontSize: "0.85rem", fontFamily: "monospace" }}>
          {problemData.difficulty?.toUpperCase()}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <IconButton onClick={handleLikes} size="small">
            <ThumbUpIcon sx={{ color: isLiked ? "#10b981" : "#475569", fontSize: 18 }} />
          </IconButton>
          <Typography variant="body2" sx={{ color: "#94a3b8", fontWeight: 700, fontFamily: "monospace" }}>{likes}</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <IconButton onClick={handleDisLikes} size="small">
            <ThumbDownAltIcon sx={{ color: isDisLiked ? "#f87171" : "#475569", fontSize: 18 }} />
          </IconButton>
          <Typography variant="body2" sx={{ color: "#94a3b8", fontWeight: 700, fontFamily: "monospace" }}>{disLikes}</Typography>
        </Box>

        {isSolved && <DoneAllIcon sx={{ color: "#10b981", fontSize: 20 }} />}
      </Box>
      
      <Box sx={{ maxWidth: "800px" }}>
        <Typography variant="body1" sx={{ color: "#cbd5e1", lineHeight: 1.7, fontSize: "1rem", mb: 4 }}>
          {problemData.description}
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, fontSize: "1.05rem", color: "#ffffff", fontFamily: "monospace" }}>
          // Examples
        </Typography>
        
        {problemData?.examples?.map((example, index) => (
          <ExampleBox key={index}>
            {/* Changed from #38bdf8 to landing page emerald green #10b981 */}
            <Typography variant="body2" sx={{ color: "#10b981", fontWeight: 800, mb: 1, fontFamily: "monospace" }}>
              Example {index + 1}:
            </Typography>
            <Typography variant="body2" sx={{ color: "#e2e8f0", mb: 0.5, fontFamily: "monospace" }}>
              <span style={{ color: "#64748b", fontWeight: 700 }}>Input:</span> {example.input}
            </Typography>
            <Typography variant="body2" sx={{ color: "#e2e8f0", mb: 0.5, fontFamily: "monospace" }}>
              <span style={{ color: "#64748b", fontWeight: 700 }}>Output:</span> {example.output}
            </Typography>
            {example.explanation && (
              <Typography variant="body2" sx={{ color: "#94a3b8", mt: 1, fontStyle: "italic", fontFamily: "monospace" }}>
                Explanation: {example.explanation}
              </Typography>
            )}
          </ExampleBox>
        ))}

        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, fontSize: "1.05rem", color: "#ffffff", fontFamily: "monospace" }}>
            // Constraints
          </Typography>
          {problemData?.constraints?.map((constraint, index) => (
            <Box key={index} sx={{ display: "flex", gap: 1, mb: 1.5, alignItems: "center" }}>
              <Typography sx={{ color: "#10b981", fontWeight: 900 }}>•</Typography>
              <Typography variant="body2" sx={{ 
                color: "#cbd5e1", 
                fontFamily: "monospace",
                backgroundColor: "rgba(30, 41, 59, 0.2)",
                border: "1px solid rgba(30, 41, 59, 0.6)",
                px: 1.2,
                py: 0.4,
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