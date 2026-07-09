import React, { useState, useEffect } from "react";
import NewNav from "./NewNav";
import Split from "react-split";
import "../components/split.css";
import { Box, Button, Paper, Typography, alpha, styled } from "@mui/material";
import Editor, { useMonaco } from "@monaco-editor/react";
import axios from "axios";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import SubmitAnimation from "./loader/SubmitAnimation";
import {PlayGroundContainer, ActionButton, ConsoleBox} from "../styledComponents/StyledComp.jsx";

function PlayGround({ tesTCCases , problemData }) {
  const { problemId } = useParams();
  const userId = useSelector((state) => state.auth.user._id);
  const monaco = useMonaco();

const getCodeKey = (lang) => `code_${problemId}_${lang}`;
  const langKey = `selectedLanguage_${problemId}`;

  const [language, setLanguage] = useState(() => localStorage.getItem(langKey) || "javascript");
const [code, setCode] = useState("");
  const [testCases, setTestCases] = useState(tesTCCases);
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  const language_id = { c: 1, cpp: 2, javascript: 9, java: 3, python: 4 };

useEffect(() => {
    const savedLang =
        localStorage.getItem(langKey) || "javascript";

    setLanguage(savedLang);

    setStory(null);
    setResponse(null);
    setTestCases(tesTCCases);
}, [problemId]);
useEffect(() => {
    if (!problemData) return;

    const storageKey = getCodeKey(language);

    const savedCode = localStorage.getItem(storageKey);

    if (savedCode) {
        setCode(savedCode);
    } else {
        setCode(
            problemData.starterCode?.[language] || ""
        );
    }
}, [language, problemData, problemId]);

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("codecraft-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#090d16", // Adjusted to remove contrast lines around margins
          "editor.lineHighlightBackground": "#1e293b",
          "editor.lineHighlightBorder": "#090d16",
        },
      });
      monaco.editor.setTheme("codecraft-dark");
    }
  }, [monaco]);

  useEffect(() => {
    localStorage.setItem(langKey, language);
  }, [language, langKey]);

const handleCodeChange = (value = "") => {

    setCode(value);

    localStorage.setItem(
        getCodeKey(language),
        value
    );
};

  const encodeBase64 = (str) => btoa(unescape(encodeURIComponent(str)));

  const handleRunCode = async () => {
    setLoading(true);
    try {
      const config = { withCredentials: true, headers: { "Content-Type": "application/json" } };
      const data = { 
        language_id: language_id[language], 
        base64EncodedCode: encodeBase64(code), 
        problemId: problemId 
      };
      
      const res = await axios.post(`${apiUrl}/user/getSubmission`, data, config);
      setTestCases(res.data.updatedTestCases);
      setStory(res.data.failureStatus);
      return res.data.results;
    } catch (error) {
      toast.error("Execution Protocol Failed");
    } finally {
      setLoading(false);
    }
  };

  const setAttempt = async () => {
    const results = await handleRunCode();
    if (!results) return;

    let finalStory = "Accepted";
    results.forEach((res) => {
      if (res.status !== "Accepted") finalStory = res.status;
    });

    try {
      await axios.post(
        `${apiUrl}/user/judge0-callback`,
        { story: finalStory, problemId, userId },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      toast.success(`SYSTEM: ${finalStory}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/problems/analyze`, { code }, { withCredentials: true });
      setResponse(res.data.analysis);
      toast.success("AI Analysis Complete");
    } catch (error) {
      toast.error("AI Protocol Error");
    } finally {
      setLoading(false);
    }
  };

  const getColor = (status) => {
    if (status === "Accepted") return "#10b981"; // Adjusted to signature Emerald Green
    if (["Wrong Answer", "Runtime Error", "Time Limit Exceeded"].includes(status)) return "#f87171";
    return "#64748b";
  };

  return (
    <PlayGroundContainer>
      <NewNav setLanguage={setLanguage} language={language} />
      
      <Box sx={{ 
        display: "flex", 
        justifyContent: "flex-end", 
        gap: 2, 
        p: 1.5, 
        px: 3, 
        borderBottom: "1px solid rgba(30, 41, 59, 0.6)",
        bgcolor: "rgba(9, 13, 22, 0.9)"
      }}>
        <ActionButton onClick={handleRunCode}>Run Code</ActionButton>
        <ActionButton 
          sx={{ 
            backgroundColor: "#10b981", 
            color: "#090d16",
            border: "1px solid #10b981",
            "&:hover": { 
              backgroundColor: "transparent", 
              color: "#10b981" 
            } 
          }} 
          onClick={setAttempt}
        >
          Submit
        </ActionButton>
      </Box>

      <Split 
        className="split-vertical"
        direction="vertical" 
        sizes={[65, 35]} 
        minSize={100}
        gutterSize={8}
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <Editor
            height="100%"
            language={language}
            value={code}
            theme="codecraft-dark"
            onChange={handleCodeChange}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              automaticLayout: true,
              padding: { top: 16 }
            }}
          />
        </Box>

        <ConsoleBox>
          <Paper sx={{ 
            bgcolor: "rgba(30, 41, 59, 0.2)", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between", 
            p: 1.5, mb: 3, borderRadius: "8px",
            border: "1px solid #1e293b"
          }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CheckBoxIcon sx={{ color: "#10b981", fontSize: 20 }} /> {/* Adjusted to Emerald */}
              <Typography sx={{ fontWeight: 800, fontSize: "0.75rem", color: "#94a3b8", fontFamily: "monospace" }}>
                TERMINAL_LOGS
              </Typography>
            </Box>

            {story === "Accepted" && (
              <Button 
                size="small"
                onClick={handleAnalyze}
                sx={{ color: "#10b981", fontSize: "0.7rem", fontWeight: 900, fontFamily: "monospace" }} // Adjusted to Emerald
              >
                {">"} ANALYZE_AI
              </Button>
            )}
          </Paper>

          {loading ? (
            <Box sx={{ height: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <SubmitAnimation />
            </Box>
          ) : (
            <Box>
              <Box display="flex" flexWrap="wrap" gap={3} mb={3}>
                {testCases?.slice(0, 3).map((test, i) => (
                  <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1, color: getColor(test.status) }}>
                    <TaskAltRoundedIcon sx={{ fontSize: 18 }} />
                    <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: "monospace" }}>
                      Case_{test.id || i + 1}
                    </Typography>
                  </Box>
                ))}
                {story && (
                  <Typography sx={{ 
                    color: getColor(story), 
                    fontWeight: 900, 
                    ml: "auto", 
                    fontFamily: "monospace",
                    bgcolor: alpha(getColor(story), 0.1),
                    px: 1.5, borderRadius: "4px"
                  }}>
                    STATUS: {story.toUpperCase()}
                  </Typography>
                )}
              </Box>

              {response && (
                <Box sx={{ mt: 2, borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
                   <SyntaxHighlighter
                    language="markdown"
                    style={atomOneDark}
                    customStyle={{
                      padding: "20px",
                      fontSize: "12px",
                      backgroundColor: "rgba(30, 41, 59, 0.2)",
                      scrollbarWidth: "none",
                    }}
                  >
                    {response}
                  </SyntaxHighlighter>
                </Box>
              )}
            </Box>
          )}
        </ConsoleBox>
      </Split>
    </PlayGroundContainer>
  );
}

export default PlayGround;