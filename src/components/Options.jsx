import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
  alpha,
  styled,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: "12px",
  color: "#ffffff",
  backgroundColor: alpha("#1e293b", 0.5),
  transition: "all 0.2s ease-in-out",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: alpha("#ffffff", 0.1),
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: alpha("#6366f1", 0.6),
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#6366f1",
    boxShadow: `0 0 10px ${alpha("#6366f1", 0.2)}`,
  },
  "& .MuiSvgIcon-root": {
    color: "#64748b",
  },
}));

const StyledMenuItem = styled(MenuItem)({
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 20px",
  transition: "background 0.2s",
  "&.Mui-selected": {
    backgroundColor: alpha("#6366f1", 0.15),
    "&:hover": {
      backgroundColor: alpha("#6366f1", 0.25),
    },
  },
});

const Options = () => {
  const languages = ["Java", "Python", "C++", "C", "Javascript"];
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleChange = (event) => {
    const { target: { value } } = event;
    setSelected(typeof value === "string" ? value.split(",") : value);
  };

  const handleSubmit = async () => {
    if (selected.length === 0) {
      toast.error("Please select at least one module.");
      return;
    }

    setLoading(true);
    const config = {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };

    try {
      const response = await axios.post(
        `${apiUrl}/user/updateLanguages`,
        { languages: selected },
        config
      );
      
      if (!response.data.success) {
        toast.error(response.data.message);
        setLoading(false);
        return;
      }
      
      toast.success("Profile Protocol Updated");
      setTimeout(() => window.location.reload(), 1200);
    } catch (error) {
      console.error(error);
      toast.error("Network Error: Update Failed");
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: { xs: "90%", sm: "420px" },
        margin: "auto",
        mt: 4,
        p: 4,
        borderRadius: "24px",
        background: `linear-gradient(145deg, ${alpha("#0f172a", 0.8)}, ${alpha("#1e293b", 0.4)})`,
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography
          sx={{
            fontFamily: "monospace",
            fontSize: "20px",
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "1px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1
          }}
        >
          <span style={{ color: "#6366f1" }}>{">"}</span> LANGUAGE_CONFIG
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "#64748b", mt: 1, display: "block", letterSpacing: "0.5px" }}
        >
          SYNCING USER_EXPERTISE TO CORE_SYSTEM
        </Typography>
      </Box>

      <FormControl fullWidth>
        <InputLabel sx={{ color: "#64748b", "&.Mui-focused": { color: "#6366f1" } }}>
          Select Expertise
        </InputLabel>
        <StyledSelect
          multiple
          value={selected}
          onChange={handleChange}
          input={<OutlinedInput label="Select Expertise" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
              {selected.map((value) => (
                <Box 
                  key={value} 
                  sx={{ 
                    bgcolor: alpha("#6366f1", 0.15), 
                    px: 1.5, 
                    py: 0.3, 
                    borderRadius: "6px",
                    border: `1px solid ${alpha("#6366f1", 0.3)}`,
                    color: "#a5b4fc",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    textTransform: "uppercase"
                  }}
                >
                  {value}
                </Box>
              ))}
            </Box>
          )}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: "#0f172a",
                color: "#ffffff",
                backgroundImage: "none",
                mt: 1,
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                "& .MuiMenuItem-root": {
                  fontSize: "0.85rem",
                  fontFamily: "monospace",
                  "&:hover": { bgcolor: alpha("#6366f1", 0.1) }
                }
              },
            },
          }}
        >
          {languages.map((language) => (
            <StyledMenuItem key={language} value={language}>
              {language}
              <Checkbox 
                size="small"
                checked={selected.includes(language)} 
                sx={{ 
                  color: "#475569", 
                  "&.Mui-checked": { color: "#6366f1" } 
                }} 
              />
            </StyledMenuItem>
          ))}
        </StyledSelect>

        <Button
          variant="contained"
          disabled={loading}
          sx={{
            mt: 4,
            py: 1.8,
            bgcolor: "#6366f1",
            color: "white",
            borderRadius: "12px",
            fontWeight: 800,
            fontSize: "0.9rem",
            textTransform: "uppercase",
            letterSpacing: "1px",
            boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)",
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: "#4f46e5",
              boxShadow: "0 0 30px rgba(99, 102, 241, 0.6)",
              transform: "translateY(-2px)",
            },
            "&:active": {
              transform: "translateY(0)",
            },
            "&.Mui-disabled": {
              bgcolor: alpha("#6366f1", 0.3),
              color: alpha("#ffffff", 0.5)
            }
          }}
          onClick={handleSubmit}
        >
          {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Initialize Update"}
        </Button>
      </FormControl>
    </Box>
  );
};

export default Options;