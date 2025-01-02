import React, { useState } from 'react';
import { Paper, TextField, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ResponsiveAppBar from './navbar';
import { useEffect } from 'react';
import CustomizedMenus from './options';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    
    // If userId is null, redirect to login
    if (!userId) {
      navigate('/');
    }
  }, [navigate]);

  const paperStyle = {
    padding: 30,
    maxWidth: 600,
    margin: '10vh auto',
    borderRadius: "15px"
    // boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
  };

  const userId = localStorage.getItem('userId');
  const [username, setUsername] = useState("username");
  const [name, setName] = useState("name");

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://127.0.0.1:8000/accounts/getinfo";

      try {
        const response = await axios.post(url, { user_id: userId });
        console.log(response.data);
        setUsername(response.data.username);
        setName(response.data.name);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the function to fetch data
  }, []); // Empty dependency array ensures it runs only on reload

  return (
    <div>
      {/* <ResponsiveAppBar pages={['Book', 'History']} /> */}
      <Grid container justifyContent="center">
        <Paper elevation={3} style={paperStyle}>
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                Profile
              </Typography>
            </Grid>
            <Grid item container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <TextField
                  id="username-field"
                  label="Username"
                  value={username}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="name-field"
                  label="Name"
                  value={name}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid item>
              <CustomizedMenus />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
}
