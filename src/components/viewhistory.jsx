import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ResponsiveAppBar from './navbar';

function Display() {
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [departure, setDeparture] = React.useState(null);

  const userId = localStorage.getItem('userId');
  const url = "http://127.0.0.1:8000/booking/viewhistory";

  // Fetch booking history inside useEffect
  React.useEffect(() => {
    const fetchBookingHistory = async () => {
      setLoading(true);  // Set loading to true while fetching
      try {
        const response = await axios.get(url, {
          params: { user_id: userId },  // Pass user_id as a query parameter
        });
        
        // Ensure each row has an 'id' field (if not already present in the response)
        const dataWithId = response.data.map((item, index) => {
          const rawDeparture = item.schedule.departure;
          
          const formattedDeparture = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'numeric', // "December"
            day: 'numeric', // "28"
            hour: 'numeric', // "5"
            minute: 'numeric', // "30"
            hour12: true, // 12-hour format
          }).format(new Date(item.schedule.departure)); // Convert to Date object for formatting
        
          return {
            id: index + 1,
            name: item.name,
            train_no: item.train.train_no,
            train_name: item.train.train_name,
            departure_from_source: formattedDeparture, // Display the formatted departure
              rawDeparture,
            class: item.class_type,
            booking_status: item.booking_status,
            schedule_id: item.schedule.schedule_id
          };
        });
        
        // console.log(dataWithId[0]);
        setData(dataWithId);  // Set the data state with the id included
      } catch (error) {
        console.error('Error fetching booking history:', error);
      } finally {
        setLoading(false);  // Set loading to false after fetching
      }
    };

    // Only fetch data if userId is available
    
    fetchBookingHistory();
    }, []);

  // Dynamically generate columns from data keys
  // const columns = data && data.length > 0
  //   ? Object.keys(data[0]).map((key) => ({
  //       field: key,
  //       headerName: key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()), // Format header name and capitalize first letter of each word
  //       flex: 1, // Automatically adjust column width
  //     }))
  //   : [];

  const columns = data && data.length > 0
  ? Object.keys(data[0]).map((key) => {
      // Exclude the 'id' column
      if (key === 'id' || key === 'rawDeparture' || key === 'schedule_id') return null;
      return {
        field: key,
        headerName: key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()), // Format header name and capitalize first letter of each word
        flex: 1, // Automatically adjust column width
      };
  }).filter(column => column !== null) // Remove null values (id column)
  : [];


  // Row click handler
  const onRowClick = (e) => {
    setSelectedRow(e.row);
  };

  // Handle proceed action
  const handleCancel = async () => {
    if (!selectedRow) {
      alert('Please select a row before cancelling.');
    } else {
        try {
            console.log(selectedRow);
            const response = await axios.post("http://127.0.0.1:8000/booking/cancelticket", { user_id: userId, name: selectedRow.name, train_no: selectedRow.train_no, schedule_id: selectedRow.schedule_id, class_type: selectedRow.class });
            console.log("Response:", response.data);
            alert("Booking cancelled successfully!");
          } catch (error) {
            console.error("Error cancelling ticket:", error.response ? error.response.data : error.message);
            alert("Failed to cancel booking. Please try again.");
          }
        };      
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
        {/* <ResponsiveAppBar pages={["Book", "History"]}/> */}
            <Grid container direction="column" spacing={3} sx={{ width: '100%' }}>
            {/* DataGrid Section */}
            
            <Paper elevation={3} style={paperStyle}>
                <Grid item style={{ height: '67vh', width: '100%' }}>
                    {loading ? (
                    <p>Loading...</p>  // Show a loading message while fetching
                    ) : (
                    <DataGrid
                        rows={data}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        onRowClick={onRowClick}
                    />
                    )}
                </Grid>
            </Paper>
            {/* Button Section */}
            <Grid item>
                <Button variant="contained" color="error" onClick={handleCancel}>
                CANCEL
                </Button>
            </Grid>
        </Grid>
    </div>
  );
}

export default Display;
