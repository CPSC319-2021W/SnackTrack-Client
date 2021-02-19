import TTNormsFontFamily from './fonts';
import colors from '../styles/Colors.module.css';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['TT Norms', 'sans-serif'].join(',')
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [...TTNormsFontFamily],
        body: {
          color: colors.DARK_GREY,
          backgroundColor: '#F4F5FD',
          fontVariantLigatures: 'no-common-ligatures'
        },
        p: {
          fontFamily: 'TT Norms'
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