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
import {
  HomeWrapper,
  MainContent,
  ScrollableGrid,
  GlassPaper,
  HeaderCell,
  TechGridOverlay,
  RadialGlow,
} from "../styledComponents/HomePageStyle.jsx";


function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const user = useSelector((state) => state.auth.user);

  return (
    <HomeWrapper>
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
        top="55%"
        left="25%"
        delay="-4s"
      />

      <MainContent maxWidth="xl">
        <Grid
          container
          spacing={3}
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          <Grid
            size={{ xs: 12, md: 9 }}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ mb: 2, px: 1 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: "#fff",
                }}
              >
                CORE{" "}
                <Box
                  component="span"
                  sx={{
                    background:
                      "linear-gradient(120deg,#10b981 0%,#059669 50%,#2563eb 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline",
                  }}
                >
                  LIBRARY
                </Box>
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  color: "#94a3b8",
                  fontFamily: "'Fira Code', monospace",
                }}
              >
                {`> SESSION_ACTIVE: ${
                  user?.username?.toUpperCase() || "GUEST"
                } | GRID_STATUS: ONLINE`}
              </Typography>
            </Box>

            <ScrollableGrid>
              <TableContainer
                component={GlassPaper}
                sx={{
                  width: "100%",
                  overflowX: "auto",

                  "&::-webkit-scrollbar": {
                    display: "none",
                  },

                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                }}
              >
                <Table
                  stickyHeader
                  sx={{
                    minWidth: isMobile ? 800 : "100%",
                    tableLayout: "fixed",
                    background: "#090d16",

                    "& td": {
                      borderColor: "#1e293b",
                      color: "#e2e8f0",
                    },

                    "& tr:hover": {
                      background: "rgba(16,185,129,.06)",
                    },
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <HeaderCell align="center" sx={{ width: 100 }}>
                        Status
                      </HeaderCell>

                      <HeaderCell sx={{ width: 250 }}>Identifier</HeaderCell>

                      <HeaderCell align="center" sx={{ width: 150 }}>
                        Complexity
                      </HeaderCell>

                      <HeaderCell align="center" sx={{ width: 150 }}>
                        Sector
                      </HeaderCell>

                      <HeaderCell align="right" sx={{ width: 150 }}>
                        Resource
                      </HeaderCell>
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
            <Grid
              size={{ md: 3 }}
              sx={{
                height: "100%",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  position: "sticky",
                  top: 0,
                  zIndex: 2,
                }}
              >
                <GlassPaper
                  sx={{
                    mt: 10,
                    p: 0,
                    background: "#090d16",
                    border: "1px solid #1e293b",
                  }}
                >
                  <Profile />
                </GlassPaper>

                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    mt: 2,
                    textAlign: "center",
                    color: "#64748b",
                    fontFamily: "'Fira Code', monospace",
                    letterSpacing: "1px",
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
