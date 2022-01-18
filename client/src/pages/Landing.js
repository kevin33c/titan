import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

//components
import Footer from '../components/layouts/Footer';
import Header from '../components/layouts/Header';

function Landing() {
  return (
    <>
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor: '#051E3C',
          color: 'white'
        }}
      >
        <CssBaseline />
        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
          <Typography variant="h3" component="h3" gutterBottom>
            Welcome to Project Titan
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            This...
          </Typography>
          <Typography variant="body1">Footer placeholder...</Typography>
        </Container>
        <Footer />
      </Box>
    </>
  )
}

export default Landing
