import React, { useState } from 'react';
import {
  styled,
  alpha,
  keyframes,
} from '@mui/material/styles';
import {
  Button,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: '10vw',
    color: theme.palette.text.primary,
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
  },
}));

const fadeInSlide = keyframes`
  from {
    opacity: 0;
    transform: translateX(50%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [changePassword, setChangePassword] = useState(false);
  const [changeUsername, setChangeUsername] = useState(false);
  const [password, setPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const open = Boolean(anchorEl);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProceed = async () => {
    try {
      const url = changeUsername
        ? 'http://127.0.0.1:8000/accounts/usernamechange'
        : 'http://127.0.0.1:8000/accounts/passwordchange';
      const payload = changeUsername
        ? { user_id: userId, password: password, new_username: newUsername }
        : { user_id: userId, password: password, new_password: newPassword };

        const token = localStorage.getItem('jwt_token'); // assuming you stored the JWT token in localStorage
        const response = await axios.post(url, payload, {
          headers: {
              Authorization: `Bearer ${token}`, // Attach the JWT token here
          },
      });

      if (response.data.success) {
        alert(
          changeUsername
            ? 'Username changed successfully!'
            : 'Password changed successfully!'
        );
        // navigate('/profile');
        window.location.reload();
    } else {
        alert('Error: ' + response.data.message);
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
      console.error(error);
    }
  };

  return (
    <div>
      <Button
        id="options-button"
        aria-controls={open ? 'options-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{ marginTop: 2 }}
      >
        Options
      </Button>
      <StyledMenu
        id="options-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            setChangePassword(false);
            setChangeUsername(true);
            handleClose();
          }}
        >
          <EditIcon />
          Change Username
        </MenuItem>
        <MenuItem
          onClick={() => {
            setChangeUsername(false);
            setChangePassword(true);
            handleClose();
          }}
        >
          <FileCopyIcon />
          Change Password
        </MenuItem>
      </StyledMenu>

      {(changeUsername || changePassword) && (
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          sx={{
            marginTop: 4,
            animation: `${fadeInSlide} 0.5s ease-in-out`,
          }}
        >
          {changeUsername && (
            <>
              <TextField
                label="New Username"
                fullWidth
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
            </>
          )}
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          {changePassword && (
            <TextField
              label="New Password"
              type="password"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleProceed}
          >
            Proceed
          </Button>
        </Grid>
      )}
    </div>
  );
}
