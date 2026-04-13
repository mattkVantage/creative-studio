import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F97316',
      contrastText: '#fff',
    },
    secondary: {
      main: '#1E3A5F',
      contrastText: '#fff',
    },
    background: {
      default: '#EDF1F5',
    },
  },
  typography: {
    fontFamily: "Calibri, 'Segoe UI', sans-serif",
    fontSize: 13,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontFamily: "Calibri, 'Segoe UI', sans-serif",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: "Calibri, 'Segoe UI', sans-serif",
        },
      },
    },
  },
});

export default theme;
