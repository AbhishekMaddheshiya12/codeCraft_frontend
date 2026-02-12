import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  styled,
  alpha,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userExist } from "../redux/reducers/auth";
import toast from "react-hot-toast";
import TerminalIcon from "@mui/icons-material/Terminal";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const GlassPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: alpha("#0f172a", 0.8), 
  backdropFilter: "blur(12px)",
  borderRadius: "24px",
  border: `1px solid ${alpha("#ffffff", 0.1)}`,
  boxShadow: `0 20px 50px ${alpha("#000", 0.5)}`,
  color: "#f8fafc",
}));

const StyledTextField = styled(TextField)({
  "& .MuiInputLabel-root": { color: "#94a3b8" },
  "& .MuiInput-root": {
    color: "#fff",
    "&:before": { borderBottomColor: alpha("#fff", 0.2) },
    "&:after": { borderBottomColor: "#6366f1" },
  },
  "& .MuiInput-input": {
    fontFamily: "'Fira Code', monospace",
    fontSize: "0.9rem",
  },
});

const NeonButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
  color: "#fff",
  fontWeight: 700,
  padding: "12px",
  borderRadius: "12px",
  textTransform: "none",
  fontSize: "1rem",
  boxShadow: `0 4px 14px 0 ${alpha("#6366f1", 0.39)}`,
  transition: "all 0.3s ease",
  "&:hover": {
    background: "linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)",
    transform: "translateY(-2px)",
    boxShadow: `0 6px 20px ${alpha("#6366f1", 0.5)}`,
  },
}));

function Login({ setIsLogin }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const config = {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };

    try {
      const { data } = await axios.post(
        "https://codecraft-sr3j.onrender.com/user/login",
        { username: userName, password, email },
        config
      );
      dispatch(userExist(data.user));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Auth failed");
    }
  };

  return (
    <Box
      sx={{
        width: { xs: "90%", sm: "400px" },
        margin: "auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      <GlassPaper elevation={0}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              letterSpacing: "-1.5px",
              mb: 1,
              background: "linear-gradient(to right, #fff, #94a3b8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Access Terminal
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b", fontFamily: "monospace" }}>
            [ status: awaiting_credentials ]
          </Typography>
        </Box>

        <form
          style={{ display: "flex", flexDirection: "column", gap: "25px" }}
          onSubmit={submitHandler}
        >
          <StyledTextField
            label="Handle (Username)"
            variant="standard"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TerminalIcon sx={{ fontSize: 18, color: "#6366f1" }} />
                </InputAdornment>
              ),
            }}
          />
          <StyledTextField
            label="Email"
            variant="standard"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailIcon sx={{ fontSize: 18, color: "#6366f1" }} />
                </InputAdornment>
              ),
            }}
          />
          <StyledTextField
            label="Password"
            variant="standard"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOpenIcon sx={{ fontSize: 18, color: "#6366f1" }} />
                </InputAdornment>
              ),
            }}
          />
          <NeonButton type="submit" fullWidth>
            Authorize Session
          </NeonButton>
        </form>

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body2" sx={{ color: "#64748b", mb: 1 }}>
            New to the grid?
          </Typography>
          <Button
            onClick={() => setIsLogin(false)}
            sx={{
              color: "#818cf8",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.9rem",
              "&:hover": { background: "transparent", color: "#fff" },
            }}
          >
            Create Developer Profile
          </Button>
        </Box>
      </GlassPaper>
    </Box>
  );
}

export default Login;