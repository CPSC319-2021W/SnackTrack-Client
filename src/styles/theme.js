import colors from '../styles/Colors.module.css';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Source Sans Pro'
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': 'Source Sans Pro',
        body: {
          color: colors.DARK_GREY
        },
        h1: {
          fontSize: '6rem'
        },
        h2: {
          fontSize: '3.75rem'
        },
        h3: {
          fontSize: '3rem'
        },
        h4: {
          fontSize: '2.125rem'
        },
        h5: {
          fontSize: '1.5rem'
        },
        h6: {
          fontSize: '1.25rem'
        }
      }
    },
    MuiButtonBase: {
      root: {
        fontFamily: 'Source Sans Pro'
      }
    }
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  }
});

export default theme;