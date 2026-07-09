import React, { useState } from "react";
import {
  Box,
  FormControl,
  IconButton,
  Select,
  MenuItem,
  styled,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  EditorNavWrapper,
  StyledSelect,
  ActionIcon,
} from "../styledComponents/StyledComp.jsx";

function NewNav({ setLanguage, language }) {
  const [fullScreen, setFullScreen] = useState(false);

  const changeHandler = (e) => {
    setLanguage(e.target.value);
  };

  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(
          `Error attempting to enable full-screen mode: ${e.message}`,
        );
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <EditorNavWrapper>
      <Box sx={{ minWidth: 150 }}>
        <FormControl fullWidth size="small">
          <StyledSelect
            value={language}
            onChange={changeHandler}
            IconComponent={KeyboardArrowDownIcon}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: "#090d16",
                  border: "1px solid #1e293b",
                  borderRadius: "8px",
                  marginTop: "6px",
                  boxShadow: "0 12px 30px -10px rgba(0, 0, 0, 0.7)",
                  "& .MuiMenu-list": {
                    padding: "4px",
                  },
                  "& .MuiMenuItem-root": {
                    color: "#cbd5e1",
                    fontSize: "0.75rem",
                    fontFamily: "'Fira Code', monospace",
                    fontWeight: 700,
                    padding: "8px 14px",
                    borderRadius: "4px",
                    transition: "all 0.15s ease-in-out",
                    "&:hover": {
                      bgcolor: "rgba(16, 185, 129, 0.1)",
                      color: "#10b981",
                    },
                    "&.Mui-selected": {
                      bgcolor: "rgba(16, 185, 129, 0.15)",
                      color: "#10b981",
                      fontWeight: 900,
                      "&:hover": {
                        bgcolor: "rgba(16, 185, 129, 0.2)",
                      },
                    },
                  },
                },
              },
            }}
          >
            <MenuItem value={"javascript"}>JAVASCRIPT</MenuItem>
            <MenuItem value={"python"}>PYTHON</MenuItem>
            <MenuItem value={"java"}>JAVA</MenuItem>
            <MenuItem value={"cpp"}>C++_STABLE</MenuItem>
            <MenuItem value={"c"}>C_LEGACY</MenuItem>
          </StyledSelect>
        </FormControl>
      </Box>

      <Box sx={{ display: "flex", gap: 1 }}>
        <ActionIcon onClick={() => console.log("System Settings Initialized")}>
          <SettingsIcon sx={{ fontSize: 18 }} />
        </ActionIcon>

        <ActionIcon onClick={toggleFullScreen}>
          {fullScreen ? (
            <FullscreenExitIcon sx={{ fontSize: 20 }} />
          ) : (
            <FullscreenIcon sx={{ fontSize: 20 }} />
          )}
        </ActionIcon>
      </Box>
    </EditorNavWrapper>
  );
}

export default NewNav;
