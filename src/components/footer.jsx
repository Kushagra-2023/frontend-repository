import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import Grid from '@mui/material/Grid2';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#1976d2', color: 'white', padding: '20px 0', marginTop: '5vh' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              We are committed to providing a seamless user experience for all your travel needs. Long live the Queen!
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: 'left' }}>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                  Phone no.: +91 9999999999
              </Grid>
              <Grid item>
                  Email: expectnoreply@yourquery.any 
              </Grid>
              <Grid item>
                  Commited to serving the British crown.
              </Grid>
            </Grid>
          </Grid>                
        </Grid>
      </Container>
      <Box sx={{ textAlign: 'center', paddingTop: '20px' }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Railways. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
