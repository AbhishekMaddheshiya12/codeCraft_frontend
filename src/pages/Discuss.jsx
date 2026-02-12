import React, { useEffect, useState, useRef } from "react";
import { Box, IconButton, Stack, useMediaQuery, useTheme, styled, alpha, Typography } from "@mui/material";
import { io } from "socket.io-client";
import SendIcon from "@mui/icons-material/Send";
import NavBar from "../components/NavBar";
import User from "../components/User";
import MessageComponent from "../components/MessageComponent";
import { InputBox } from "../components/StyledComp";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import Loader from "../components/loader/Loader";

// --- Styled Components ---

const DiscussWrapper = styled(Box)({
  height: "100vh",
  backgroundColor: "#020617",
  backgroundImage: `radial-gradient(circle at 50% -10%, rgba(99, 102, 241, 0.15) 0%, transparent 60%)`,
  color: "#ffffff",
  overflow: "hidden",
});

const GlassChatArea = styled(Box)(({ theme }) => ({
  background: alpha("#0f172a", 0.6),
  backdropFilter: "blur(20px)",
  borderRadius: "20px",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  display: "flex",
  flexDirection: "column",
  height: "calc(100vh - 100px)",
  padding: theme.spacing(2),
  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)",
}));

const SidebarBox = styled(Box)(({ theme }) => ({
  backgroundColor: alpha("#0f172a", 0.8),
  borderRadius: "20px",
  height: "calc(100vh - 100px)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  overflowY: "auto",
  "&::-webkit-scrollbar": { display: "none" },
}));

function Discuss() {
  const user = useSelector((state) => state.auth.user);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loader, setLoader] = useState(true);
  const containerRef = useRef(null);
  const socketRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // --- Auto-scroll to bottom ---
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // --- Fetch Initial Messages ---
  useEffect(() => {
    const fetchMessages = async () => {
      setLoader(true);
      try {
        const config = {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        };
        // Fixed template literal for API endpoint
        const response = await axios.get(`https://codecraft-sr3j.onrender.com/user/getMessages/1`, config);
        setMessages(response.data.message);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoader(false);
      }
    };
    fetchMessages();
  }, []);

  // --- Socket Connection ---
  useEffect(() => {
    socketRef.current = io("https://codecraft-sr3j.onrender.com", {
      withCredentials: true,
      transports: ["websocket"],
    });

    socketRef.current.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== "" && socketRef.current) {
      const messageData = { 
        message, 
        sender: user._id, 
        sendername: user.username 
      };
      
      socketRef.current.emit("message", messageData);
      setMessage("");
    }
  };

  return (
    <DiscussWrapper>
      <NavBar />
      <Box sx={{ p: 2, height: "100%" }}>
        <Grid container spacing={2} sx={{ height: "100%" }}>
          
          {/* LEFT: USER LIST / PROFILE (Hidden on Mobile) */}
          {!isMobile && (
            <Grid size={{ md: 3 }}>
              <SidebarBox>
                <User userData={user} />
              </SidebarBox>
            </Grid>
          )}

          {/* RIGHT: CHAT AREA */}
          <Grid size={{ xs: 12, md: 9 }}>
            {loader ? (
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <Loader />
              </Box>
            ) : (
              <GlassChatArea>
                <Box sx={{ mb: 1, px: 1 }}>
                   <Typography variant="caption" sx={{ color: "#475569", fontFamily: "monospace" }}>
                     {`> CHANNEL: GLOBAL_FORUM | LATENCY: OPTIMAL`}
                   </Typography>
                </Box>
                
                <Stack
                  ref={containerRef}
                  spacing={2}
                  sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                    padding: "10px",
                    "&::-webkit-scrollbar": { width: "4px" },
                    "&::-webkit-scrollbar-thumb": { 
                      background: alpha("#6366f1", 0.3), 
                      borderRadius: "10px" 
                    },
                  }}
                >
                  {messages.length > 0 ? (
                    messages.map((m, idx) => (
                      <MessageComponent
                        key={m._id || idx}
                        sender={m.sender?._id || m.sender}
                        message={m.message}
                        sendername={m.sendername || m.sender?.username}
                        date={m.createdAt}
                      />
                    ))
                  ) : (
                    <Typography sx={{ textAlign: 'center', mt: 4, color: '#475569' }}>
                      No transmissions found in this sector.
                    </Typography>
                  )}
                </Stack>

                <Box component="form" onSubmit={handleSendMessage} sx={{ 
                  mt: 2, 
                  display: "flex", 
                  gap: 1, 
                  alignItems: "center",
                  bgcolor: alpha("#1e293b", 0.5),
                  p: 1,
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.05)"
                }}>
                  <InputBox
                    placeholder="Type your message..."
                    sx={{ 
                      flex: 1, 
                      color: "gray",
                      "& input": { color: "gray" } 
                    }}
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                  />
                  <IconButton
                    type="submit"
                    sx={{
                      backgroundColor: "#6366f1",
                      color: "white",
                      "&:hover": { bgcolor: "#4f46e5" },
                      transition: "all 0.3s"
                    }}
                  >
                    <SendIcon fontSize="small" />
                  </IconButton>
                </Box>
              </GlassChatArea>
            )}
          </Grid>
        </Grid>
      </Box>
    </DiscussWrapper>
  );
}

export default Discuss;