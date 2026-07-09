import React, { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { green, red, yellow } from "@mui/material/colors";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {TableRow,TableCell, Box, Skeleton, alpha, styled } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import {StyledRow,Link} from "../styledComponents/StyledComp.jsx";

function ProblemTable() {
  const user = useSelector((state) => state.auth.user);
  const [problems, setProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setIsLoading(true);
        const config = {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        };
        const response = await axios.get(
          `${apiUrl}/problems/all-problems`,
          config
        );
        setProblems(response.data || []);
      } catch (error) {
        console.error("Error fetching problems:", error);
        setProblems([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProblems();
  }, []);

  if (isLoading || !user) {
    return (
      <>
        {[...Array(8)].map((_, i) => (
          <TableRow key={i}>
            <TableCell colSpan={5}>
              <Skeleton variant="text" sx={{ bgcolor: alpha("#fff", 0.05), height: 40 }} />
            </TableCell>
          </TableRow>
        ))}
      </>
    );
  }

  return (
    <>
      {problems.length > 0 ? (
        problems.map((problem) => {
          const difficultyColor =
            problem.difficulty === "Easy"
              ? green[400]
              : problem.difficulty === "Medium"
              ? yellow[600]
              : red[400];

          const isSolved = user?.problemSolved?.includes(String(problem.id));

          return (
            <StyledRow key={problem.id}>
              <TableCell align="center">
                {isSolved ? (
                  <CheckIcon sx={{ color: green[500], fontSize: 20 }} />
                ) : (
                  <Box sx={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.1)" }} />
                )}
              </TableCell>
              <TableCell>
                <Link sx={{ color: "#fff", fontWeight: 500, textDecoration: "none" }} to={`/problems/${problem.id}`}>
                  {problem.id}. {problem.title}
                </Link>
              </TableCell>

              <TableCell align="center" sx={{ color: difficultyColor, fontWeight: 700, fontSize: "0.8rem" }}>
                {problem.difficulty?.toUpperCase()}
              </TableCell>

              <TableCell align="center" sx={{ color: "#94a3b8", fontFamily: "monospace" }}>
                {problem.category}
              </TableCell>

              <TableCell align="right">
                {problem.videoId === "" ? (
                  <Typography variant="caption" sx={{ color: "#475569" }}>-</Typography>
                ) : (
                  <a
                    href={`https://www.youtube.com/watch?v=${problem.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <YouTubeIcon sx={{ color: "#ef4444", "&:hover": { transform: "scale(1.2)" }, transition: "0.2s" }} />
                  </a>
                )}
              </TableCell>
            </StyledRow>
          );
        })
      ) : (
        <TableRow>
          <TableCell colSpan={5} align="center" sx={{ py: 4, color: "#64748b" }}>
            No resources found in current library segment.
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

export default ProblemTable;