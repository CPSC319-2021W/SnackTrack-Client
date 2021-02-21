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
          color: colors.DARK_GREY,
          fontFamily: 'TT Norms',
          fontVariantLigatures: 'no-common-ligatures'
        },
        h1: {
          color: colors.DARK_GREY,
          fontSize: '6rem',
          fontVariantLigatures: 'no-common-ligatures'
        },
        h2: {
          color: colors.DARK_GREY,
          fontSize: '3.75rem',
          fontVariantLigatures: 'no-common-ligatures'
        },
        h3: {
          color: colors.DARK_GREY,
          fontSize: '3rem',
          fontVariantLigatures: 'no-common-ligatures'
        },
        h4: {
          color: colors.DARK_GREY,
          fontSize: '2.125rem',
          fontVariantLigatures: 'no-common-ligatures'
        },
        h5: {
          color: colors.DARK_GREY,
          fontSize: '1.5rem',
          fontVariantLigatures: 'no-common-ligatures'
        },
        h6: {
          color: colors.DARK_GREY,
          fontSize: '1.25rem',
          fontVariantLigatures: 'no-common-ligatures'
        }
      }
    },
    MuiButtonBase: {
      root: {
        fontFamily: 'Source Sans Pro'
      }
    },
    MuiCheckbox: {
      root: {
        color: colors.PURPLE,
        '&&:hover': {
          backgroundColor: 'transparent'
        }
      },
      colorSecondary: {
        '&$checked': {
          color: colors.PURPLE,
          '&:hover': {
            backgroundColor: 'transparent'
          }
        }
      }
    },
    MuiCircularProgress: {
      colorPrimary: {
        color: colors.LIGHT_GREY
      }
    },
    MuiInput: {
      input: {
        fontSize: '1rem'
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
