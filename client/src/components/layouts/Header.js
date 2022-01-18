import { Component } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import Badge from '@mui/material/Badge';

//services
import { Web3Service } from '../../services/web3.service';

//instantiate service
const web3Service = new Web3Service();

let isConnected;

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isConnected: ''
    };

    this.connect = this.connect.bind(this);
  }

  async componentDidMount() {
    this.checkConnection();
  }

  async connect() {
    await web3Service.connect();
    this.checkConnection();
  }

  async checkConnection() {
    isConnected = await web3Service.checkConnection();
    this.setState({ isConnected });
  }

  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar className="navbar" sx={{ bgcolor: "#1fe0" }}>
          <Toolbar variant="dense">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
            </Typography>
            {this.state.isConnected
              ? <Button size="small"
                disabled={true}
              >
                <Badge variant="dot" color="success">
                  <ElectricalServicesIcon sx={{ color: "white" }} />
                </Badge>
              </Button>
              : <Button size="small"
                onClick={this.connect}
                sx={{ fontWeight: 'bold', mr: 2, color: 'white', textTransform: 'none' }}>
                Connect
              </Button>
            }
          </Toolbar>
        </AppBar>
      </Box>
    )
  }
}

export default Header
