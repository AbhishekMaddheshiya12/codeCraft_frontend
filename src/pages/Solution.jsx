import React, { useEffect, useState } from "react";
import ProblemStatement from "../components/ProblemStatement";
import PlayGround from "../components/PlayGround";
import Split from "react-split";
import "../components/split.css";
import NavBar from "../components/NavBar";
import { Box, useMediaQuery, useTheme, styled } from "@mui/material";
import { useParams } from "react-router";
import Submission from "../components/Submission.jsx";
import axios from "axios";
import Loader from "../components/loader/Loader.jsx";

const SolutionWrapper = styled(Box)({
  backgroundColor: "#020617",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

const PaneContainer = styled("div")({
  height: "100%",
  overflow: "hidden",
});

function Solution() {
  const { problemId } = useParams();
  const [isSubmission, setIsSubmission] = useState(false);
  const [problemdata, setProblemData] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Changed to 'md' to match Home/Profile breakpoint
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/problems/${problemId}`,
        );
        setProblemData(response?.data?.problem[0]);
      } catch (error) {
        console.error("Error fetching problem data:", error);
      }
    };

    getData();
  }, [problemId]);

  if (!problemdata) {
    return (
      <SolutionWrapper sx={{ justifyContent: "center", alignItems: "center" }}>
        <Loader />
      </SolutionWrapper>
    );
  }

  const tesTCases = problemdata.testCases;

  return (
    <SolutionWrapper>
      <NavBar />

      {isMobile ? (
        <PaneContainer>
          {isSubmission ? (
            <Submission
              problemId={problemId}
              setIsSubmission={setIsSubmission}
            />
          ) : (
            <ProblemStatement
              problemData={problemdata}
              setIsSubmission={setIsSubmission}
            />
          )}
        </PaneContainer>
      ) : (
        <Split
          className="split"
          sizes={[45, 55]}
          minSize={300}
          gutterSize={8}
          direction="horizontal"
          cursor="col-resize"
          style={{ height: "calc(100vh - 64px)", display: "flex" }}
        >
          <PaneContainer>
            {isSubmission ? (
              <Submission
                problemId={problemId}
                setIsSubmission={setIsSubmission}
              />
            ) : (
              <ProblemStatement
                problemData={problemdata}
                setIsSubmission={setIsSubmission}
              />
            )}
          </PaneContainer>

          <PaneContainer>
            <PlayGround tesTCases={tesTCases} problemId={problemId} problemData={problemdata} />
          </PaneContainer>
        </Split>
      )}
    </SolutionWrapper>
  );
}

export default Solution;
