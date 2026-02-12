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

const PlayGroundContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "calc(100vh - 64px)", 
  backgroundColor: "#020617",
  overflow: "hidden",
});

const ActionButton = styled(Button)({
  backgroundColor: alpha("#1e293b", 0.8),
  color: "#fff",
  padding: "6px 20px",
  fontWeight: 700,
  borderRadius: "8px",
  fontSize: "0.8rem",
  textTransform: "none",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  "&:hover": {
    backgroundColor: "#6366f1",
    boxShadow: "0 0 15px rgba(99, 102, 241, 0.3)",
  },
});

const ConsoleBox = styled(Box)({
  height: "100%",
  backgroundColor: "#020617",
  color: "white",
  padding: "16px",
  overflowY: "auto",
  overflowX: "hidden",
  scrollbarWidth: "none", 
  "&::-webkit-scrollbar": { display: "none" },
  msOverflowStyle: "none",
});

function PlayGround({ tesTCases }) {
  const { problemId } = useParams();
  const userId = useSelector((state) => state.auth.user._id);
  const monaco = useMonaco();

  const codeKey = `code_${problemId}`;
  const langKey = `selectedLanguage_${problemId}`;

  const [language, setLanguage] = useState(() => localStorage.getItem(langKey) || "javascript");
  const [code, setCode] = useState(() => localStorage.getItem(codeKey) || "");
  const [testCases, setTestCases] = useState(tesTCases);
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const language_id = { c: 1, cpp: 2, javascript: 9, java: 3, python: 4 };

  useEffect(() => {
    const savedCode = localStorage.getItem(codeKey);
    const savedLang = localStorage.getItem(langKey);
    
    setCode(savedCode || "");
    setLanguage(savedLang || "javascript");
    setStory(null);
    setResponse(null);
    setTestCases(tesTCases);
  }, [problemId, codeKey, langKey, tesTCases]);

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("codecraft-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#0f172a", 
          "editor.lineHighlightBackground": "#1e293b",
        },
      });
      monaco.editor.setTheme("codecraft-dark");
    }
  }, [monaco]);

  useEffect(() => {
    localStorage.setItem(langKey, language);
  }, [language, langKey]);

  const handleCodeChange = (value) => {
    setCode(value);
    localStorage.setItem(codeKey, value);
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
      
      const res = await axios.post("https://codecraft-sr3j.onrender.com/user/getSubmission", data, config);
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
        "https://codecraft-sr3j.onrender.com/user/judge0-callback",
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
      const res = await axios.post(`https://codecraft-sr3j.onrender.com/problems/analyze`, { code }, { withCredentials: true });
      setResponse(res.data.analysis);
      toast.success("AI Analysis Complete");
    } catch (error) {
      toast.error("AI Protocol Error");
    } finally {
      setLoading(false);
    }
  };

  const getColor = (status) => {
    if (status === "Accepted") return "#4ade80";
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
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        bgcolor: alpha("#0f172a", 0.4)
      }}>
        <ActionButton onClick={handleRunCode}>Run Code</ActionButton>
        <ActionButton sx={{ bgcolor: "#6366f1", "&:hover": { bgcolor: "#4f46e5" } }} onClick={setAttempt}>
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
            bgcolor: alpha("#1e293b", 0.4), 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between", 
            p: 1.5, mb: 3, borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.05)"
          }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CheckBoxIcon sx={{ color: "#6366f1", fontSize: 20 }} />
              <Typography sx={{ fontWeight: 800, fontSize: "0.75rem", color: "#94a3b8", fontFamily: "monospace" }}>
                TERMINAL_LOGS
              </Typography>
            </Box>

            {story === "Accepted" && (
              <Button 
                size="small"
                onClick={handleAnalyze}
                sx={{ color: "#4ade80", fontSize: "0.7rem", fontWeight: 900, fontFamily: "monospace" }}
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
                      backgroundColor: alpha("#0f172a", 0.5),
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