import { Component } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

//services
import { Web3Service } from '../../services/web3.services';

//instantiate service
const web3Service = new Web3Service();

class Header extends Component {

  async connect() {
    await web3Service.connect();
  }

  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar className="navbar" sx={{ bgcolor: "#1fe0" }}>
          <Toolbar variant="dense">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
            </Typography>
            <Button size="small"
              onClick={this.connect}
              sx={{ fontWeight: 'bold', mr: 2, color: 'white', textTransform: 'none' }}>
              Connect
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    )
  }
}

export default Header
