import React, { useState, useEffect } from 'react';
import { Paper, TextField, Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ResponsiveAppBar from './navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default function Booking() {
  const location = useLocation();
  const { selectedRow } = location.state || {};
  const [outArray, setOutArray] = useState([]);
  const [rows, setRows] = useState([{ name: '', class: '3' }]);
  const navigate = useNavigate();


  useEffect(() => {
    const userId = localStorage.getItem('userId');
    
    // If userId is null, redirect to login
    if (!userId) {
      navigate('/');
    }
  }, [navigate]);

  if (selectedRow) {
    console.log('Selected Row:', selectedRow);  // Debug log to check selectedRow
  }

  const classes = [
    { value: 1, label: 'Second AC' },
    { value: 2, label: 'Third AC' },
    { value: 3, label: 'Sleeper' },
  ];

  const handleAddRow = () => {
    setRows([...rows, { name: '', class: '3' }]);
  };

  const handleRemoveRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const paperStyle = {
    padding: 10,
    width: "40vw",
    margin: "5vh auto",
    borderRadius: "15px"
  };

  const url = "http://127.0.0.1:8000/booking/seatbooking";

  const handleProceed = async () => {
    let tempOutArray = []; // Temporary array to store booking data
    
    // Loop through each row and send data one at a time
    for (const row of rows) {
      const bookingData = {
        user: localStorage.getItem("userId"),
        name: row.name,
        train: parseInt(selectedRow.train_number, 10),       // Ensure train_id is passed as an integer
        schedule: parseInt(selectedRow.schedule_id, 10), // Ensure schedule_id is passed as an integer
        class_type: parseInt(row.class, 10),
      };
  
      console.log('Booking Data:', bookingData);  // Debug log for sending data

      try {
        const response = await axios.post(url, bookingData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.status === 201) {
          console.log('Booking Successful:', response.data);
          
          // Add success message to temporary array
          tempOutArray.push({
            Name: response.data.booking.name,
            Remark: response.data.message,
          });

        } else {
          console.error('Error in Booking:', response.data);
        }
      } catch (error) {
        console.error('Error making request:', error);
      }
    }
    
    // Update the outArray state with the collected booking data
    setOutArray(tempOutArray);

    // Optionally, display the booking messages in an alert
    alert(tempOutArray.map(item => `${item.Name}: ${item.Remark}`).join("\n"));
    navigate("/homepage");
  };

  return (
    <div>
      {/* <ResponsiveAppBar pages={["Book", "History"]} /> */}
      <Grid container justifyContent="center" sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <Paper elevation={3} style={paperStyle}>
          {rows.map((row, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px',
                marginTop: '1%',
                marginLeft: '1%',
                marginRight: '1%',
              }}
            >
              {/* Name Input */}
              <TextField
                label="Name"
                variant="outlined"
                value={row.name}
                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                sx={{ width: '60%' }}
              />

              {/* Class Selection */}
              <TextField
                select
                label="Class"
                value={row.class}
                onChange={(e) => handleInputChange(index, 'class', e.target.value)}
                sx={{ width: '30%' }}
              >
                {classes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              {/* Remove Button */}
              {rows.length > 1 && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleRemoveRow(index)}
                  sx={{ minWidth: 'fit-content' }}
                >
                  <RemoveIcon />
                </Button>
              )}
            </Box>
          ))}

          {/* Add Row Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddRow}
            startIcon={<AddIcon />}
            sx={{ marginTop: '2%' }}
          >
            Add Row
          </Button>
        </Paper>

        {/* Proceed Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleProceed}
          sx={{ marginTop: '0', width: '20vw' }}
        >
          Proceed
        </Button>
      </Grid>
    </div>
  );
}
