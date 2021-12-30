import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {

    // primary: {
    //     main: '#084d8d',
    //   },
    //   secondary: {
    //     main: '#78be20',
    //   },
    //   error: {
    //    // main: 'red.A400',
    //    main:'#ffcd00'
    //   },
    //   warning: {
    //     // main: 'red.A400',
    //     main:'#ffcd00'
    //    },
    //   background: {
    //     default: '#fff',
    //   },
    //   success: {
    //     main: '#D35400',
    //   },
    // },
    
    primary: {
      main: '#084d8d',
    },
    secondary: {
      main: '#FF0000',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;