import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#244855', // Blue
    },
    secondary: {
      main: '#f50057', // Pink
    },
    background: {
      default: '#f4f6f8', // Light grey background
      paper: '#ffffff', // White for cards/paper components
    },
    text: {
      primary: '#333333', // Dark text
      secondary: '#555555', // Lighter text
    },
  },
  typography: {
    fontFamily: `'Merriweather', 'Open Sans', sans-serif`,
    h1: { fontSize: '2rem', fontWeight: 500 },
    h2: { fontSize: '1.8rem', fontWeight: 500 },
    subtitle1: { fontSize: '1.2rem', fontWeight: 400 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1976d2',
          color: '#ffffff',
        },
      },
    },
  },
});

export default theme;
