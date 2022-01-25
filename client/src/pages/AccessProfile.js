import { useState } from 'react';

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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

//services
import { Web3Service } from '../services/web3.service';

const web3Service = new Web3Service();

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

function AccessProfile() {

  const [profile, setProfile] = useState([]);

  const onSearch = async (event) => {
    if (event.key === 'Enter') {
      const data = await web3Service.accessProfile(event.target.value);
      setProfile(data);
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
      {profile?.length > 0 &&
        <TableContainer component={Paper} sx={{ maxWidth: 650, mt: 10 , ml: 50}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Account:
                </TableCell>
                <TableCell align="left">
                  {profile?.account}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Name:
                </TableCell>
                <TableCell align="left">
                  {profile?.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Surname:
                </TableCell>
                <TableCell align="left">
                  {profile?.surname}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Email:
                </TableCell>
                <TableCell align="left">
                  {profile?.email}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      }
    </>
  )
}

export default AccessProfile;
