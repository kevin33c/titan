import { useState } from 'react';
import { useNavigate } from "react-router-dom";

//mui
import {
  alpha
  , styled
  , InputBase
  , Table
  , TableBody
  , TableCell
  , TableContainer
  , TableRow
  , Paper
  , TableHead
  , Button
  , Modal
  , Box
  , Typography
  , TextField
  , FormControl
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';

//services
import { RequestsService } from '../services/requests.service';
import { Web3Service } from '../services/web3.service';


const requestsService = new RequestsService();
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

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function AcceptRequests() {

  const navigate = useNavigate();
  const [requestsList, setRequestsList] = useState([]);
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [requesterAddress, setRequesterAddress] = useState('');
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);

  const onSearch = async (event) => {
    if (event.key === 'Enter') {
      const data = await requestsService.getRequestByAddress(event.target.value);
      setRequestsList(data);
    }
  }

  const handleOpen = async (_address, _requesterAddress, _id) => {
    setOpen(true);
    setAddress(_address);
    setRequesterAddress(_requesterAddress);
    setId(_id);
  }

  const handleClose = async () => {
    setOpen(false);
  }

  async function handleSubmit() {
    setLoading(true);
    var data = {
      id: id
      , requester_address: requesterAddress
      , address: address
    }
    try {
      await web3Service.acceptRequest(data);
      navigate('/');
    } catch (error) {
      alert.error(error);
    } finally {
      setLoading(false);
    }

  }

  return (
    <>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          onKeyDown={onSearch}
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
      <TableContainer sx={{ maxWidth: 1200, mt: '5%', ml: '15%' }} component={Paper}>
        {requestsList?.length > 0 &&
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>From</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Accepted</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requestsList?.map((row) => (
                <TableRow
                  key={row?.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row?.requester_address}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row?.profile_address}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row?.amount}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row?.message}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row?.is_accepted.toString()}
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    <Button
                      value={row?.address}
                      variant="contained"
                      color="secondary"
                      size='small'
                      onClick={() => handleOpen(row?.profile_address, row?.requester_address, row?.id)}
                      sx={{ mt: '5px', mb: '5px' }}
                    >
                      Accept
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
                label="Request From"
                type="text"
                value={requesterAddress}
                disabled
                variant="filled"
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: '15px', mb: '15px' }}>
              <TextField
                id="address"
                label="Profile Address"
                type="text"
                value={address}
                disabled
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
              Accept Request
            </LoadingButton>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default AcceptRequests;
