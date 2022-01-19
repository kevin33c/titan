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
  , CardMedia
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
        <Container component="main" sx={{ mt: '10%', mb: 5 }}>
          <Box sx={{ width: '100%' }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid item xs={4}>
                <Card sx={{ minWidth: 275 }}>
                  <CardMedia
                    component="img"
                    height="100"
                    image="/static/images/cards/create-profile.jpg"
                    alt="create profile"
                  />
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
              <Grid item xs={4}>
                <Card sx={{ minWidth: 275 }}>
                  <CardMedia
                    component="img"
                    height="100"
                    image="/static/images/cards/request-access.jpg"
                    alt="request access"
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Request Access
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Request to access other profile data.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link to="/addresses" style={{ textDecoration: 'none' }}>
                      <Button size="small">Request</Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card sx={{ minWidth: 275 }}>
                  <CardMedia
                    component="img"
                    height="100"
                    image="/static/images/cards/accept-request.jpg"
                    alt="accept request"
                  />
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
              <Grid item xs={4}>
                <Card sx={{ minWidth: 275 }}>
                  <CardMedia
                    component="img"
                    height="100"
                    image="/static/images/cards/access-profile.jpg"
                    alt="access profile"
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Access Profile
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Access approved profile data.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Access</Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card sx={{ minWidth: 275 }}>
                  <CardMedia
                    component="img"
                    height="100"
                    image="/static/images/cards/identity.jpg"
                    alt="identity"
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Identify
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Login using your profile smart contract.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                      <Button size="small">Login</Button>
                    </Link>
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
