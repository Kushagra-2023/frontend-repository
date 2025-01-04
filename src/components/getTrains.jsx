import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';

function Display({ data }) {
  const navigate = useNavigate();
  const [selectedRowId, setSelectedRowId] = React.useState(null);

  // Dynamically generate columns from data keys
  const columns = data && data.length > 0
    ? Object.keys(data[0]).map((key) => {
        if (key === 'id' || key === 'schedule_id') return null; // Exclude 'id' and 'schedule_id'
        return {
          field: key,
          headerName: key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()), // Format header name
          flex: 1, // Automatically adjust column width
        };
    }).filter(column => column !== null) // Remove null values
    : [];

  const onRowClick = (e) => {
    setSelectedRowId(e.row.id);
  };

  const handleProceed = () => {
    if (!selectedRowId) {
      alert('Please select a row before proceeding.');
    } else {
      const selectedRow = data.find((row) => row.id === selectedRowId);
      if (selectedRow) {
        navigate('/booking', { state: { selectedRow } });
      }
    }
  };

  return (
    data && data.length > 0 ? (
      <Grid container direction="column" spacing={3} sx={{ width: '100%' }}>
        {/* DataGrid Section */}
        <Grid item style={{ height: 350, width: '100%' }}>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            onRowClick={onRowClick}
          />
        </Grid>
  
        {/* Button Section */}
        <Grid item>
          <Button variant="contained" onClick={handleProceed}>
            Proceed
          </Button>
        </Grid>
      </Grid>
    ) : (
      <Typography variant="subtitle1" color="textSecondary">
        No data available to display.
      </Typography>
    )
  );
  
}

export default Display;
