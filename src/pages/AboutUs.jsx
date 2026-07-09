import React from "react";
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import cpp from "react-syntax-highlighter/dist/esm/languages/hljs/cpp";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

import NavBar from "../components/NavBar";

import {
  AboutWrapper,
  GlassCard,
  HeroOverlay,
  HeroTitle,
  HeroSubtitle,
  SectionTitle,
  SectionLabel,
  SectionText,
  HeroButton,
  GradientText,
  CardTitle,
  CardDescription,
  LogBox,
  TerminalText,
  CodeWrapper,
  FooterWrapper,
  FooterText,
} from "../styledComponents/AboutStyle.jsx";

import { TechGridOverlay, RadialGlow } from "../styledComponents/HomePageStyle.jsx";

SyntaxHighlighter.registerLanguage("cpp", cpp);

const heroImage =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1470&q=80";

const features = [
  {
    title: "CORE LIBRARY",
    description:
      "Solve challenges, submit code, and get instant feedback with our industrial-grade execution engine.",
    icon: "",
  },
  {
    title: "THE TERMINAL",
    description:
      "Collaborate with developers, discuss solutions and learn together in real time.",
    icon: "",
  },
  {
    title: "NEURAL ASSIST",
    description:
      "Get instant AI-powered assistance to debug code and master new concepts.",
    icon: "",
  },
  {
    title: "SYNC PROFILE",
    description:
      "Track your journey, monitor progress and showcase your achievements.",
    icon: "",
  },
];

const palindromeCode = `#include <iostream>
using namespace std;

bool isPalindrome(int x) {
    if (x < 0 || (x % 10 == 0 && x != 0))
        return false;

    int rev = 0;

    while (x > rev) {
        rev = rev * 10 + x % 10;
        x /= 10;
    }

    return x == rev || x == rev / 10;
}

int main() {
    int n;
    cin >> n;

    cout << (isPalindrome(n)
        ? "Success"
        : "Failure");

    return 0;
}`;

function AboutUs() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AboutWrapper>
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
        left="20%"
        delay="-4s"
      />

      <Box
        sx={{
          position: "relative",
          height: "70vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={heroImage}
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <HeroOverlay />

        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            zIndex: 2,
          }}
        >
          <Box sx={{ maxWidth: 800 }}>
            <HeroTitle variant={isMobile ? "h3" : "h1"}>
              CRAFTING THE <br />
              <GradientText>FUTURE</GradientText> OF CODE
            </HeroTitle>

            <HeroSubtitle variant="h5">
              {`> Initializing CodeCraft_v4.2... Status: ONLINE`}
            </HeroSubtitle>

            <HeroButton variant="contained" sx={{ mt: 4 }}>
              ENTER THE GRID
            </HeroButton>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <SectionLabel variant="overline">OUR MISSION</SectionLabel>

            <SectionTitle variant="h3" sx={{ mt: 1, mb: 3 }}>
              Beyond Binary.
            </SectionTitle>

            <SectionText
              variant="body1"
              sx={{
                fontSize: "1.15rem",
              }}
            >
              At CodeCraft, we believe programming is an art form. We provide
              the perfect digital environment where developers sharpen their
              problem-solving skills, master algorithms, and build software that
              powers tomorrow's technology.
            </SectionText>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}></Grid>
        </Grid>
      </Container>

      <Box
        sx={{
          py: 12,
          background: "rgba(11,17,30,.45)",
          borderTop: "1px solid #1e293b",
          borderBottom: "1px solid #1e293b",
        }}
      >
        <Container maxWidth="xl">
          <SectionTitle
            variant="h3"
            sx={{
              textAlign: "center",
              mb: 8,
            }}
          >
            SYSTEM <GradientText>CAPABILITIES</GradientText>
          </SectionTitle>

          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid
                key={index}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 3,
                }}
              >
                <GlassCard>
                  <Typography
                    variant="h2"
                    sx={{
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Typography>

                  <CardTitle
                    variant="h6"
                    sx={{
                      mb: 2,
                    }}
                  >
                    {feature.title}
                  </CardTitle>

                  <CardDescription variant="body2">
                    {feature.description}
                  </CardDescription>
                </GlassCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          py: 12,
        }}
      >
        <Grid container spacing={6} alignItems="center">
          <Grid
            size={{
              xs: 12,
              md: 5,
            }}
          >
            <SectionTitle
              variant="h3"
              sx={{
                mb: 3,
              }}
            >
              PROTOTYPE <br />
              TESTING
            </SectionTitle>

            <SectionText
              variant="body1"
              sx={{
                mb: 4,
              }}
            >
              Experience the Palindrome Protocol. Our execution engine processes
              thousands of operations every second while validating logical
              correctness with production-grade precision.
            </SectionText>

            <LogBox>
              <TerminalText variant="caption">
                LOG: Execution successful. Time: 0.002ms
              </TerminalText>
            </LogBox>
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 7,
            }}
          >
            <CodeWrapper>
              <SyntaxHighlighter
                language="cpp"
                style={atomOneDark}
                showLineNumbers
                customStyle={{
                  margin: 0,
                  padding: "24px",
                  background: "#0b111e",
                  fontSize: "0.9rem",
                  borderRadius: "16px",
                }}
              >
                {palindromeCode}
              </SyntaxHighlighter>
            </CodeWrapper>
          </Grid>
        </Grid>
      </Container>

      <FooterWrapper>
        <Container maxWidth="lg">
          <FooterText variant="body2">
            © {new Date().getFullYear()} CODECRAFT_OS. ALL RIGHTS RESERVED.
            <br />
            STABLE_BUILD_4.2.0
          </FooterText>
        </Container>
      </FooterWrapper>
    </AboutWrapper>
  );
}

export default AboutUs;
