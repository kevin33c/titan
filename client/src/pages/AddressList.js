import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

//mui
import {
  Table
  , TableBody
  , TableCell
  , TableContainer
  , TableRow
  , Paper
  , Link
  , TableHead
  , Button
  , Modal
  , Box
  , Typography
  , TextField
  , FormControl
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LinkIcon from '@mui/icons-material/Link';
import SendIcon from '@mui/icons-material/Send';

//services
import { ProfilesService } from '../services/profiles.service';
import { Web3Service } from '../services/web3.service';

const profilesService = new ProfilesService();
const web3Service = new Web3Service();

const style = {
  width: '30%',
  maxWidth: '100vw',
  maxHeight: '100%',
  position: 'fixed',
  top: '30%',
  left: '30%',
  transform: 'translate(0, -50%)',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function AddressList() {

  const navigate = useNavigate();
  const [addressesList, setAddressesList] = useState([]);
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  //trigger before the page load
  useEffect(() => {
    getAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getAddresses() {
    const data = await profilesService.getProfiles();
    setAddressesList(data);
  }

  const handleOpen = async (address) => {
    setOpen(true);
    setAddress(address);
  }

  const handleClose = async () => {
    setOpen(false);
  }

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  async function handleSubmit() {
    setLoading(true);
    var data = {
      amount: amount
      , message: message
      , address: address
    }
    try {
      await web3Service.requestAccess(data);
      navigate('/');
    } catch (error) {
      alert.error(error);
    } finally {
      setLoading(false);
    }

  }

  return (
    <>
      <TableContainer sx={{ maxWidth: 700, mt: '10%', ml: '20%' }} component={Paper}>
        {addressesList?.length > 0 &&
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Address</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {addressesList?.map((row) => (
                <TableRow
                  key={row?.address}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row?.address}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Link href={`https://rinkeby.etherscan.io/address/${row?.address}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <LinkIcon />
                    </Link>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Button
                      value={row?.address}
                      variant="contained"
                      color="secondary"
                      onClick={() => handleOpen(row?.address)}
                      sx={{ mt: '5px', mb: '5px' }}
                    >
                      Request
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        }
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography variant="h6" align="center" margin="dense" sx={{ color: 'black' }}>
            Request Access
          </Typography>
          <form>
            <FormControl fullWidth sx={{ mt: '15px', mb: '15px' }}>
              <TextField
                id="address"
                label="Address"
                type="text"
                value={address}
                disabled
                variant="filled"
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: '15px', mb: '15px' }}>
              <TextField
                id="filled-number"
                label="Amount (ETH)"
                type="number"
                value={amount}
                onChange={handleAmountChange}
                variant="filled"
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: '15px', mb: '15px' }}>
              <TextField
                id="filled-number"
                label="Message"
                type="text"
                value={message}
                onChange={handleMessageChange}
                variant="filled"
              />
            </FormControl>
            <LoadingButton
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: '15px', mb: '15px' }}
              loading={loading}
              loadingPosition="start"
              startIcon={<SendIcon />}
            >
              Join Game
            </LoadingButton>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default AddressList