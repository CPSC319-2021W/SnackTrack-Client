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