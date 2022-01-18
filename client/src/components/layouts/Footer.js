import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="white">
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        bgcolor: '#2D3843'
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1">
          Footer placeholder.
        </Typography>
        <Copyright />
      </Container>
    </Box>
  )
}

export default Footer
