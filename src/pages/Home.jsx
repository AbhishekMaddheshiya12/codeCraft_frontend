import React from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  styled,
  alpha,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ProblemTable from "../components/ProblemTable";
import NavBar from "../components/NavBar";
import Profile from "../components/Profile";
import { useSelector } from "react-redux";

const HomeWrapper = styled(Box)({
  height: "100vh", 
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#020617", 
  backgroundImage: `radial-gradient(circle at 50% -10%, rgba(99, 102, 241, 0.15) 0%, transparent 60%)`,
  color: "#ffffff",
  overflow: "hidden", 
});

const MainContent = styled(Container)(({ theme }) => ({
  flex: 1,
  display: "flex",
  gap: theme.spacing(3),
  marginTop: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  overflow: "hidden", 
}));

const ScrollableGrid = styled(Box)(({ theme }) => ({
  flex: 1,
  height: "100%",
  overflowY: "auto",     
  overflowX: "hidden",     
  paddingRight: theme.spacing(1),
  "&::-webkit-scrollbar": { display: "none" },
  msOverflowStyle: "none", 
  scrollbarWidth: "none", 
}));

const GlassPaper = styled(Paper)({
  background: alpha("#0f172a", 0.6),
  backdropFilter: "blur(20px)",
  borderRadius: "20px",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)",
  overflow: "hidden", 
});

const HeaderCell = styled(TableCell)({
  backgroundColor: "#1e293b", 
  color: "#64748b",
  fontWeight: 800,
  fontSize: "0.7rem",
  textTransform: "uppercase",
  letterSpacing: "1.5px",
  borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  position: "sticky",
  top: 0,
  zIndex: 10,
});

function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const user = useSelector((state) => state.auth.user);

  return (
    <HomeWrapper>
      <NavBar />

      <MainContent maxWidth="xl">
        <Grid container spacing={3} sx={{ width: "100%", height: "100%" }}>
          <Grid size={{ xs: 12, md: 9 }} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Box sx={{ mb: 2, px: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: "-1px" }}>
                CORE <span style={{ color: "#6366f1" }}>LIBRARY</span>
              </Typography>
              <Typography variant="caption" sx={{ color: "#475569", fontFamily: "monospace" }}>
                {`> SESSION_ACTIVE: ${user?.username?.toUpperCase() || 'GUEST'} | GRID_STATUS: ONLINE`}
              </Typography>
            </Box>

            <ScrollableGrid>
              <TableContainer 
                component={GlassPaper} 
                sx={{ 
                  width: "100%",
                  overflowX: "auto",
                  "&::-webkit-scrollbar": { display: "none" },
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                }}
              >
                <Table 
                  stickyHeader 
                  sx={{ 
                    minWidth: isMobile ? 800 : "100%",
                    tableLayout: "fixed" 
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <HeaderCell align="center" sx={{ width: 100 }}>Status</HeaderCell>
                      <HeaderCell sx={{ width: 250 }}>Identifier</HeaderCell>
                      <HeaderCell align="center" sx={{ width: 150 }}>Complexity</HeaderCell>
                      <HeaderCell align="center" sx={{ width: 150 }}>Sector</HeaderCell>
                      <HeaderCell align="right" sx={{ width: 150 }}>Resource</HeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <ProblemTable />
                  </TableBody>
                </Table>
              </TableContainer>
            </ScrollableGrid>
          </Grid>
          {!isMobile && (
            <Grid size={{ md: 3 }} sx={{ height: "100%" }}>
              <Box sx={{ 
                height: "100%", 
                position: "sticky", 
                top: 0 
              }}>
                <GlassPaper sx={{ p: 0 }}>
                  <Profile />
                </GlassPaper>
                
                <Typography 
                  variant="caption" 
                  sx={{ 
                    display: "block", 
                    mt: 2, 
                    textAlign: "center", 
                    color: alpha("#475569", 0.5),
                    fontFamily: "monospace" 
                  }}
                >
                  SYSTEM_VER: 4.2.0_STABLE
                </Typography>
              </Box>
            </Grid>
          )}

        </Grid>
      </MainContent>
    </HomeWrapper>
  );
}

export default Home;