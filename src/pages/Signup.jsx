import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  styled,
  alpha,
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

const GlassPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: alpha("#0f172a", 0.8),
  backdropFilter: "blur(16px)",
  borderRadius: "24px",
  border: `1px solid ${alpha("#ffffff", 0.1)}`,
  boxShadow: `0 20px 60px ${alpha("#000", 0.6)}`,
  color: "#f8fafc",
  width: "100%",
  minHeight: "520px", 
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
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

const CyberButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
  color: "#fff",
  fontWeight: 800,
  padding: "12px",
  borderRadius: "12px",
  textTransform: "none",
  minHeight: "48px", 
  "&:disabled": {
    background: alpha("#6366f1", 0.3),
    color: alpha("#fff", 0.5),
  },
}));

function Signup({ setIsLogin }) {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const config = {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };

    try {
      const { data } = await axios.post(
        "https://codecraft-sr3j.onrender.com/user/signup",
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
            bgcolor: alpha("#6366f1", 0.1), mb: 2,
            border: `1px solid ${alpha("#6366f1", 0.3)}`
          }}>
            <PersonAddIcon sx={{ color: "#818cf8" }} />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: "-1.5px" }}>
            Create Profile
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b", fontFamily: "monospace" }}>
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
                  <AccountCircleIcon sx={{ fontSize: 20, color: "#6366f1" }} />
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
                  <AlternateEmailIcon sx={{ fontSize: 20, color: "#6366f1" }} />
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
                  <LockIcon sx={{ fontSize: 20, color: "#6366f1" }} />
                </InputAdornment>
              ),
            }}
          />
          
          <CyberButton type="submit" fullWidth disabled={loading}>
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
              "Initialize Account"
            )}
          </CyberButton>
        </form>

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            variant="text"
            onClick={() => setIsLogin(true)}
            disabled={loading}
            sx={{
              color: "#818cf8", fontWeight: 700, textTransform: "none",
              "&:hover": { background: "transparent", color: "#fff" },
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