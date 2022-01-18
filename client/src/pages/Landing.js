import {
  Typography
  , CssBaseline
  , Container
  , Box
  , Grid
  , Card
  , CardContent
  , CardActions
  , Button
} from '@mui/material';
import { Link } from "react-router-dom";

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
        <Container component="main" sx={{ mt: '10%', mb: 2 }} maxWidth="sm">
          <Box sx={{ width: '100%' }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid item xs={6}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Create Profile
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Create your first profile using smart contract.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link to="/create" style={{ textDecoration: 'none' }}>
                      <Button size="small">Create</Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Request Access
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Request to access other profile data.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Request</Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Accept Request
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Accept access request to your profile data.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Accept</Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Identify
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Login using your profile smart contract.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Login</Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Footer />
      </Box>
    </>
  )
}

export default Landing
