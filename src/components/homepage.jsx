import React, { useEffect, useState } from 'react';
import { Paper, TextField, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import BasicDatePicker from './datepicker';
import Display from './getTrains';
import ResponsiveAppBar from './navbar';

export default function Homepage({ stationData }) {
  const url = "http://127.0.0.1:8000/booking/trainlist";
  const [data, setData] = useState({});
  const [src, setSrc] = useState('');
  const [dst, setDst] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDateChange = (newValue) => {
    if (newValue) {
        const formattedDate = newValue.toLocaleDateString('en-GB'); // Format: DD/MM/YYYY
        setDate(formattedDate);
    }
  };

  const handleSearch = async () => {
    if (src && dst && date) {
        setLoading(true);
        setError('');
        try {
            const { data: response } = await axios.post(url, {
                source: src,
                destination: dst,
                date: date, // Ensure date is in DD/MM/YYYY
            });

            // Ensure the data matches the desired format
            if (response && response.trains) {
                // Add unique ID to each train
                const trainsWithId = response.trains.map((train, index) => ({
                    id: index + 1, // Create unique ID (or use a different logic if needed)
                    ...train,
                }));

                setData(trainsWithId); // Set updated train data
            } else {
                setError('No trains found for the given parameters.');
            }
        } catch (error) {
            console.error(error); // Log error for debugging
            setError('Error fetching train data');
        } finally {
            setLoading(false);
        }
    } else {
        setError('Please fill all fields');
    }
};

  const paperStyle = {
      padding: 20,
      width: "70vw",
      margin: "4vh auto",
      marginBottom: "2vh",
      borderRadius: "15px"
  };

  return (
      <div>
          {/* <ResponsiveAppBar pages={["Book", "History"]} /> */}
          <Grid container justifyContent="center">
              <Paper elevation={3} style={paperStyle}>
                  <Grid container spacing={2} justifyContent="space-around" alignItems="center">
                      <Autocomplete
                          disablePortal
                          options={stationData}
                          sx={{ width: "30%" }}
                          onChange={(event, value) => setSrc(value ? value.label : '')}
                          renderInput={(params) => <TextField {...params} label="Source" />}
                      />
                      <Autocomplete
                          disablePortal
                          options={stationData}
                          sx={{ width: "30%" }}
                          onChange={(event, value) => setDst(value ? value.label : '')}
                          renderInput={(params) => <TextField {...params} label="Destination" />}
                      />
                      <BasicDatePicker setDate={setDate} />
                      <Button
                          variant="contained"
                          sx={{ height: "100%", borderRadius: 1 }}
                          onClick={handleSearch}
                      >
                          Search
                      </Button>
                  </Grid>
              </Paper>

              <Paper elevation={3} style={paperStyle}>
                  <Grid container spacing={2} justifyContent="space-around" alignItems="center">
                      <Display data={data} />
                  </Grid>
              </Paper>
          </Grid>
      </div>
  );
}
