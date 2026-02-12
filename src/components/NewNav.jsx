import {
  Box,
  FormControl,
  IconButton,
  NativeSelect,
  styled,
  alpha,
} from "@mui/material";
import React, { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

const EditorNavWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: alpha("#0f172a", 0.8),
  padding: "4px 12px",
  borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
}));

const StyledNativeSelect = styled(NativeSelect)(({ theme }) => ({
  color: "#94a3b8", 
  fontSize: "0.75rem",
  fontFamily: "monospace",
  fontWeight: 700,
  padding: "4px 12px",
  backgroundColor: alpha("#1e293b", 0.5),
  borderRadius: "6px",
  transition: "all 0.2s ease",
  "&::before, &::after": {
    display: "none", 
  },
  "&:hover": {
    backgroundColor: alpha("#6366f1", 0.1),
    color: "#6366f1",
  },
  "& select": {
    paddingRight: "24px !important",
  },
  "& option": {
    backgroundColor: "#0f172a", 
    color: "#94a3b8",
  },
}));

const ActionIcon = styled(IconButton)({
  color: "#475569",
  padding: "6px",
  transition: "all 0.2s ease",
  "&:hover": {
    color: "#6366f1",
    backgroundColor: "transparent",
    transform: "scale(1.1)",
  },
});

function NewNav({ setLanguage, language }) {
  const [fullScreen, setFullScreen] = useState(false);

  const changeHandler = (e) => {
    setLanguage(e.target.value);
  };

  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((e) => {
          console.error(`Error attempting to enable full-screen mode: ${e.message}`);
        });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <EditorNavWrapper>
      {/* LANGUAGE SELECTOR */}
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth size="small">
          <StyledNativeSelect
            value={language}
            onChange={changeHandler}
            inputProps={{
              name: 'language',
              id: 'uncontrolled-native',
            }}
          >
            <option value={"javascript"}>JAVASCRIPT</option>
            <option value={"python"}>PYTHON</option>
            <option value={"java"}>JAVA</option>
            <option value={"cpp"}>C++_STABLE</option>
            <option value={"c"}>C_LEGACY</option>
          </StyledNativeSelect>
        </FormControl>
      </Box>

      <Box sx={{ display: "flex", gap: 0.5 }}>
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