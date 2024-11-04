import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            light: '#a5f3fc',
            main: '#22d3ee',
            dark: '#0891b2',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#ffe0b2',
            main: '#ffb74d',
            dark: '#e65100',
            contrastText: '#ffffff',
        },
        info: {
            light: '#d1c4e9',
            main: '#b39ddb',
            dark: '#673ab7',
            contrastText: '#ffffff'
        },
    },
    components: {
        // Name of the component
        MuiTooltip: {
          styleOverrides: {
            // Name of the slot
            tooltip: {
              // Some CSS
              backgroundColor: '#673ab7',
            },
          },
        },
        MuiTextField: {
          styleOverrides: {
            root: {
              '&:hover': {
                '& .MuiInput-underline:before': {
                  borderColor: '#cffafe !important',
                },
                '& .MuiInput-underline:after': {
                  borderColor: '#cffafe !important',
                },
              },
              '& label': {
                color: '#67e8f9', // Label color
              },
              '& label.Mui-focused': {
                color: '#cffafe',
              },
              '& .MuiInputBase-root': {
                color: '#67e8f9', // Text color
              },
              '& .MuiInput-underline:before': {
                borderBottomColor: '#67e8f9', // Underline color when not focused
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: '#cffafe', // Underline color when focused
              },
            },
          },
        },
        MuiCircularProgress: {
          styleOverrides: {
            root: {
              width: '60px !important',
              height: '60px !important'
            }
          }
        }
      },
});

export default theme;