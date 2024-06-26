import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#021730',
      main: '#052b5a',
      dark: '#4d6ea0',
    },
    secondary: {
      light: '#D99D5D',
      main: '#e9c49e',
      dark: '#F7E7D7',
    },
    error: {
      light: '#c4414b',
      main: '#8e0023',
      dark: '#5a0000',
      contrastText: '#ffffff',
    },
    warning: {
      light: '#f3a34b',
      main: '#bc741b',
      dark: '#874800',
      contrastText: '#ffffff',
    },
    success: {
      light: '#5ccb8c',
      main: '#21995e',
      dark: '#006a33',
      contrastText: '#ffffff',
    },
    info: {
      light: '#6f9dff',
      main: '#326fcc',
      dark: '#00459a',
      contrastText: '#ffffff',
    },
  },
});
const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#0097a7',
      main: '#00a7ae',
      dark: 'rgb(0, 67, 70)',
      contrastText: '#fff',
    },
    secondary: {
      main: '#640400',
      contrastText: '#fff',
      light: 'rgb(131, 54, 51)',
      dark: 'rgb(70, 2, 0)',
    },
    error: {
      light: '#c4414b',
      main: '#8e0023',
      dark: '#5a0000',
      contrastText: '#ffffff',
    },
    warning: {
      light: '#f3a34b',
      main: '#bc741b',
      dark: '#874800',
      contrastText: '#ffffff',
    },
    success: {
      light: '#5ccb8c',
      main: '#21995e',
      dark: '#006a33',
      contrastText: '#ffffff',
    },
    info: {
      light: '#6f9dff',
      main: '#326fcc',
      dark: '#00459a',
      contrastText: '#ffffff',
    },
    background: {
      paper: '#363636',
      default: '#212121',
    },
    text: {
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      hint: 'rgba(255, 255, 255, 0.5)',
    },
    action: {
      disabledBackground: '#ffffff1f',
      disabled: '#b9b9b9',
    },
    
  }
});
const Themes = { 
  default: defaultTheme, 
  dark: darkTheme 
}
export default Themes;