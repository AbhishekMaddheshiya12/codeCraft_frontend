import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  IconButton,
  Stack,
  useMediaQuery,
  useTheme,
  styled,
  Typography,
} from "@mui/material";
import { io } from "socket.io-client";
import SendIcon from "@mui/icons-material/Send";
import NavBar from "../components/NavBar";
import User from "../components/User";
import MessageComponent from "../components/MessageComponent";
import { InputBox } from "../styledComponents/StyledComp.jsx";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import Loader from "../components/loader/Loader";
import { TechGridOverlay, RadialGlow } from "../styledComponents/HomePageStyle.jsx";
import {
  DiscussWrapper,
  GlassChatArea,
  SidebarBox,
} from "../styledComponents/DiscussStyle.jsx";

function Discuss() {
  const user = useSelector((state) => state.auth.user);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loader, setLoader] = useState(true);

  const containerRef = useRef(null);
  const socketRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const apiUrl = import.meta.env.VITE_API_URL;

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

  useEffect(() => {
    const fetchMessages = async () => {
      setLoader(true);

      try {
        const config = {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.get(
          `${apiUrl}/user/getMessages/1`,
          config,
        );

        setMessages(response.data.message);
      } catch (error) {
        console.error(error);
      } finally {
        setLoader(false);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    socketRef.current = io(apiUrl, {
      withCredentials: true,
      transports: ["websocket"],
    });

    socketRef.current.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socketRef.current?.disconnect();
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (message.trim() !== "" && socketRef.current) {
      socketRef.current.emit("message", {
        message,
        sender: user._id,
        sendername: user.username,
      });

      setMessage("");
    }
  };

  return (
    <DiscussWrapper>
      <NavBar />

      <TechGridOverlay />

      <RadialGlow
        color="radial-gradient(circle,#10b981,transparent)"
        top="-10%"
        left="-5%"
        delay="0s"
      />

      <RadialGlow
        color="radial-gradient(circle,#2563eb,transparent)"
        top="45%"
        left="18%"
        delay="-4s"
      />

      <Box
        sx={{
          p: 2,
          height: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Grid container spacing={2} sx={{ height: "100%" }}>
          {!isMobile && (
            <Grid size={{ md: 3 }}>
              <SidebarBox>
                <User userData={user} />
              </SidebarBox>
            </Grid>
          )}

          <Grid size={{ xs: 12, md: 9 }}>
            {loader ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Loader />
              </Box>
            ) : (
              <GlassChatArea>
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#94a3b8",
                      fontFamily: "'Fira Code', monospace",
                    }}
                  >
                    {`> CHANNEL: GLOBAL_FORUM | LATENCY: OPTIMAL`}
                  </Typography>
                </Box>

                <Stack
                  ref={containerRef}
                  spacing={2}
                  sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                    p: 1,

                    "&::-webkit-scrollbar": {
                      width: "5px",
                    },

                    "&::-webkit-scrollbar-thumb": {
                      background: "#10b981",
                      borderRadius: "10px",
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
                    <Typography
                      sx={{
                        textAlign: "center",
                        mt: 5,
                        color: "#64748b",
                        fontFamily: "'Fira Code', monospace",
                      }}
                    >
                      No transmissions found in this sector.
                    </Typography>
                  )}
                </Stack>

                <Box
                  component="form"
                  onSubmit={handleSendMessage}
                  sx={{
                    mt: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    p: 1.2,
                    borderRadius: "12px",
                    backgroundColor: "#0b111e",
                    border: "1px solid #1e293b",
                  }}
                >
                  <InputBox
                    placeholder="Transmit a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    sx={{
                      width: "85%",
                      color: "#f8fafc",
                      background: "transparent",

                      "&::placeholder": {
                        color: "#64748b",
                      },
                    }}
                  />

                  <IconButton
                    type="submit"
                    sx={{
                      width: 40,
                      height: 40,
                      p: 0,

                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                      borderRadius: "50%",

                      background: "linear-gradient(135deg,#10b981,#059669)",
                      color: "#050810",

                      transition: "all .25s ease",

                      "&:hover": {
                        background: "linear-gradient(135deg,#059669,#047857)",
                        transform: "translateY(-2px)",
                      },

                      "&:disabled": {
                        background: "#1e293b",
                        color: "#64748b",
                      },
                    }}
                  >
                    <SendIcon
                      sx={{
                        fontSize: 18,
                        m: 0,
                      }}
                    />
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
