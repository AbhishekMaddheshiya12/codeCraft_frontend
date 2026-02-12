import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  useMediaQuery,
  styled,
  alpha,
  Paper
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import cpp from 'react-syntax-highlighter/dist/esm/languages/hljs/cpp';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'; // Switched to Dark
import NavBar from '../components/NavBar';

SyntaxHighlighter.registerLanguage('cpp', cpp);

const AboutWrapper = styled(Box)({
  minHeight: "100vh",
  backgroundColor: "#020617",
  backgroundImage: `radial-gradient(circle at 50% -10%, rgba(99, 102, 241, 0.15) 0%, transparent 60%)`,
  color: "#ffffff",
});

const GlassCard = styled(Paper)(({ theme }) => ({
  background: alpha("#0f172a", 0.6),
  backdropFilter: "blur(20px)",
  borderRadius: "24px",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)",
  padding: theme.spacing(4),
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '&:hover': {
    transform: 'translateY(-10px)',
    border: `1px solid ${alpha("#6366f1", 0.3)}`,
    boxShadow: `0 0 30px ${alpha("#6366f1", 0.15)}`,
  }
}));

const HeroOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(to bottom, rgba(2, 6, 23, 0.3), #020617)',
  zIndex: 1,
});

// --- Constants ---
const heroImage = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1470&q=80';

const features = [
  {
    title: 'CORE LIBRARY',
    description: 'Solve challenges, submit code, and get instant feedback with our industrial-grade execution engine.',
    icon: '🚀'
  },
  {
    title: 'THE TERMINAL',
    description: 'Collaborate with a vibrant community. Ask questions, share solutions, and peer-review code.',
    icon: '💬'
  },
  {
    title: 'NEURAL ASSIST',
    description: 'Get instant help from our AI-powered chatbot. Debug code, learn concepts, and optimize logic.',
    icon: '🤖'
  },
  {
    title: 'SYNC PROFILE',
    description: 'Track progress, earn badges, and showcase your achievements with a dynamic developer HUD.',
    icon: '📊'
  }
];

const palindromeCode = `#include <iostream>
using namespace std;

// System Check: Palindrome Protocol
bool isPalindrome(int x) {
    if (x < 0 || (x % 10 == 0 && x != 0)) return false;

    int reversedNumber = 0;
    while (x > reversedNumber) {
        reversedNumber = reversedNumber * 10 + x % 10;
        x /= 10;
    }
    return x == reversedNumber || x == reversedNumber / 10;
}

int main() {
    int x;
    cin >> x;
    cout << (isPalindrome(x) ? "Success" : "Failure") << endl;
    return 0;
}`;

function AboutUs() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AboutWrapper>
      <NavBar />
      <Box sx={{ position: 'relative', height: '70vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <Box
          component="img"
          src={heroImage}
          sx={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <HeroOverlay />
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ maxWidth: 800 }}>
            <Typography
              variant={isMobile ? 'h3' : 'h1'}
              sx={{ fontWeight: 900, letterSpacing: '-2px', lineHeight: 1, mb: 2 }}
            >
              CRAFTING THE <br />
              <span style={{ color: '#6366f1' }}>FUTURE</span> OF CODE
            </Typography>
            <Typography variant="h5" sx={{ color: '#94a3b8', mb: 4, fontFamily: 'monospace' }}>
              {`> Initializing CodeCraft_v4.2... Status: ONLINE`}
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#6366f1', px: 4, py: 2, borderRadius: '12px', fontWeight: 800,
                boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)',
                '&:hover': { bgcolor: '#4f46e5' }
              }}
            >
              ENTER THE GRID
            </Button>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="overline" sx={{ color: '#6366f1', fontWeight: 800, letterSpacing: 2 }}>
              OUR MISSION
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 3 }}>
              Beyond Binary.
            </Typography>
            <Typography variant="body1" sx={{ color: '#94a3b8', fontSize: '1.2rem', lineHeight: 1.8 }}>
              At CodeCraft, we believe programming is an art form. We provide the digital canvas 
              for engineers to sculpt logic, master algorithms, and build the infrastructure of tomorrow.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
          </Grid>
        </Grid>
      </Container>
      <Box sx={{ bgcolor: alpha('#0f172a', 0.4), py: 12 }}>
        <Container maxWidth="xl">
          <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 900, mb: 8 }}>
            SYSTEM <span style={{ color: '#6366f1' }}>CAPABILITIES</span>
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <GlassCard>
                  <Typography variant="h2" sx={{ mb: 2 }}>{feature.icon}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, letterSpacing: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#94a3b8', textAlign: 'center', lineHeight: 1.6 }}>
                    {feature.description}
                  </Typography>
                </GlassCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 3 }}>
              PROTOTYPE <br /> TESTING
            </Typography>
            <Typography variant="body1" sx={{ color: '#94a3b8', mb: 4 }}>
              Experience the Palindrome Protocol. Our engine processes thousands of data points 
              per second to validate your logical integrity.
            </Typography>
            <Box sx={{ p: 2, bgcolor: alpha('#6366f1', 0.1), borderRadius: '8px', borderLeft: '4px solid #6366f1' }}>
              <Typography variant="caption" sx={{ color: '#a5b4fc', fontFamily: 'monospace' }}>
                LOG: Execution successful. Time: 0.002ms
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ 
              borderRadius: '20px', overflow: 'hidden', 
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}>
              <SyntaxHighlighter language="cpp" style={atomOneDark} showLineNumbers customStyle={{ margin: 0, padding: '24px' }}>
                {palindromeCode}
              </SyntaxHighlighter>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.05)', py: 6, textAlign: 'center' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" sx={{ color: '#475569', fontFamily: 'monospace' }}>
            © {new Date().getFullYear()} CODECRAFT_OS. ALL RIGHTS RESERVED. <br />
            STABLE_BUILD_4.2.0
          </Typography>
        </Container>
      </Box>
    </AboutWrapper>
  );
}

export default AboutUs;