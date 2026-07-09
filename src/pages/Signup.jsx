import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  styled,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userExist } from "../redux/reducers/auth";
import toast from "react-hot-toast";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  COLORS,
  GlassPaper,
  StyledTextField,
  CyberButton,
  AuthTextButton,
} from "../styledComponents/AuthStyle.jsx";

function Signup({ setIsLogin }) {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const config = {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };

    try {
      const { data } = await axios.post(
        `${apiUrl}/user/signup`,
        { username: userName, email, password },
        config
      );
      dispatch(userExist(data.user));
      toast.success(data.message || "Welcome to the Grid!");
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: { xs: "95%", sm: "420px" }, margin: "auto" }}>
      <GlassPaper elevation={0}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box sx={{ 
            display: "inline-flex", p: 1.5, borderRadius: "50%", 
            bgcolor: "#050810", mb: 2,
            border: `1px solid ${COLORS.accentGreen}`
          }}>
            <PersonAddIcon sx={{ color: COLORS.accentGreen }} />
          </Box>
          
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: "-1.5px", color: COLORS.textPrimary }}>
            Create{" "}
            <Box
              component="span"
              sx={{ 
                background: `linear-gradient(120deg, ${COLORS.accentGreen} 0%, ${COLORS.accentGreen} 40%, ${COLORS.accentBlue} 100%)`, 
                WebkitBackgroundClip: "text", 
                WebkitTextFillColor: "transparent",
                display: "inline",
                fontWeight: 900
              }}
            >
              Profile
            </Box>
          </Typography>
          
          <Typography variant="body2" sx={{ color: COLORS.textSecondary, fontFamily: "monospace", fontSize: "0.8rem", mt: 0.5 }}>
            {loading ? "[ system: writing_to_database... ]" : "[ status: idle ]"}
          </Typography>
        </Box>

        <form style={{ display: "flex", flexDirection: "column", gap: "25px" }} onSubmit={submitHandler}>
          <StyledTextField
            label="Dev Handle"
            variant="standard"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            disabled={loading}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon sx={{ fontSize: 20, color: COLORS.accentGreen }} />
                </InputAdornment>
              ),
            }}
          />
          <StyledTextField
            label="Email Address"
            variant="standard"
            value={email}
            type="email"
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailIcon sx={{ fontSize: 20, color: COLORS.accentGreen }} />
                </InputAdornment>
              ),
            }}
          />
          <StyledTextField
            label="Secret Key (Password)"
            variant="standard"
            type="password"
            value={password}
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ fontSize: 20, color: COLORS.accentGreen }} />
                </InputAdornment>
              ),
            }}
          />
          
          <CyberButton type="submit" fullWidth disabled={loading}>
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#050810" }} />
            ) : (
              "Initialize Account"
            )}
          </CyberButton>
        </form>

        <Box sx={{ textTransform: "none", textAlign: "center", mt: 4 }}>
          <Button
            variant="text"
            onClick={() => setIsLogin(true)}
            disabled={loading}
            sx={{
              color: COLORS.accentGreen, 
              fontWeight: 700, 
              textTransform: "none",
              fontFamily: "'Fira Code', monospace",
              fontSize: "0.85rem",
              "&:hover": { background: "transparent", color: COLORS.textPrimary },
            }}
          >
            Access Terminal (Login)
          </Button>
        </Box>
      </GlassPaper>
    </Box>
  );
}

export default Signup;