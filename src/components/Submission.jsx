import React, { useEffect, useState } from "react";
import { Box, Button, Paper, Typography, styled, alpha, Stack, Skeleton } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import TerminalIcon from '@mui/icons-material/Terminal';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const LogCard = styled(Paper)(({ status }) => ({
  background: alpha("#0f172a", 0.6),
  backdropFilter: "blur(10px)",
  borderRadius: "12px",
  border: `1px solid ${status === "Accepted" ? alpha("#10b981", 0.3) : alpha("#ef4444", 0.3)}`,
  padding: "16px 20px",
  marginBottom: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  transition: "transform 0.2s ease",
  "&:hover": {
    transform: "translateX(5px)",
    background: alpha("#0f172a", 0.8),
  },
}));

const TabButton = styled(Button)(({ active }) => ({
  backgroundColor: active ? alpha("#6366f1", 0.2) : "transparent",
  color: active ? "#818cf8" : "#94a3b8",
  border: `1px solid ${active ? alpha("#6366f1", 0.5) : alpha("#ffffff", 0.1)}`,
  borderRadius: "8px",
  fontSize: "0.75rem",
  fontWeight: 700,
  padding: "6px 16px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: alpha("#6366f1", 0.15),
    borderColor: "#6366f1",
  },
}));

function Submission({ problemId, setIsSubmission }) {
  const [submissionData, setSubmissionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector(state => state.auth.user._id);

  const getSubmission = async () => {
    setLoading(true);
    try {
      const config = {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.get(
        `https://codecraft-sr3j.onrender.com/user/getSubmission/${userId}/${problemId}`,
        config
      );
      setSubmissionData(data.submission || []);
    } catch (error) {
      console.error("Log Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSubmission();
  }, []);

  return (
    <Box sx={{ 
      height: `calc(100vh - 64px)`, 
      overflowY: 'auto', 
      p: 3,
      backgroundColor: "#020617",
      "&::-webkit-scrollbar": { width: "4px" },
      "&::-webkit-scrollbar-thumb": { background: alpha("#6366f1", 0.3), borderRadius: "10px" }
    }}>
      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <TabButton onClick={() => setIsSubmission(false)}>Description</TabButton>
        <TabButton>Solution</TabButton>
        <TabButton active>Submissions</TabButton>
      </Stack>

      <Typography variant="overline" sx={{ color: "#475569", fontWeight: 800, mb: 2, display: "block" }}>
        Execution History
      </Typography>

      {loading ? (
        [...Array(5)].map((_, i) => (
          <Skeleton key={i} variant="rectangular" height={60} sx={{ bgcolor: alpha("#ffffff", 0.05), mb: 2, borderRadius: "12px" }} />
        ))
      ) : submissionData.length > 0 ? (
        submissionData.map((submission, index) => {
          const isAccepted = submission.attemptTypes === "Accepted";
          const date = new Date(submission.lastAttempt);
          
          return (
            <LogCard key={submission._id} status={submission.attemptTypes}>
              <Stack direction="row" spacing={3} alignItems="center">
                <Typography sx={{ color: "#475569", fontFamily: "monospace", width: "20px" }}>
                  {String(submissionData.length - index).padStart(2, '0')}
                </Typography>
                
                <Box>
                  <Typography 
                    sx={{ 
                      color: isAccepted ? "#10b981" : "#ef4444", 
                      fontWeight: 800,
                      display: "flex",
                      alignItems: "center",
                      gap: 1
                    }}
                  >
                    {isAccepted ? <CheckCircleOutlineIcon fontSize="small"/> : <ErrorOutlineIcon fontSize="small"/>}
                    {submission.attemptTypes.toUpperCase()}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#64748b", fontFamily: "monospace" }}>
                    Runtime: {submission.runtime || "N/A"} ms
                  </Typography>
                </Box>
              </Stack>

              <Box sx={{ textAlign: "right" }}>
                <Typography sx={{ color: "#f8fafc", fontSize: "0.85rem", fontWeight: 500 }}>
                  {date.toLocaleDateString()}
                </Typography>
                <Typography variant="caption" sx={{ color: "#475569" }}>
                  {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </Box>
            </LogCard>
          );
        })
      ) : (
        <Box sx={{ textAlign: "center", py: 10, border: `1px dashed ${alpha("#ffffff", 0.1)}`, borderRadius: "20px" }}>
          <TerminalIcon sx={{ color: "#1e293b", fontSize: 40, mb: 2 }} />
          <Typography sx={{ color: "#475569", fontFamily: "monospace" }}>
            {`> NO_SUBMISSIONS_RECORDED`}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default Submission;