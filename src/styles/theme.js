import { BASE_BLUE, DARK_GREY, WHITE } from '../styles/Colors.module.css';
import TTNormsFontFamily from './fonts';
import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  typography: {
    fontFamily: ['TT Norms', 'sans-serif'].join(',')
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [...TTNormsFontFamily],
        body: {
          color: DARK_GREY,
          backgroundColor: '#F8F9FF',
          fontVariantLigatures: 'no-common-ligatures',
          overflowY: 'scroll'
        },
        p: {
          color: DARK_GREY,
          fontFamily: 'TT Norms',
          fontVariantLigatures: 'no-common-ligatures'
        },
        h1: {
          color: DARK_GREY,
          fontSize: '6rem',
          fontVariantLigatures: 'no-common-ligatures'
        },
        h2: {
          color: DARK_GREY,
          fontSize: '3.75rem',
          fontVariantLigatures: 'no-common-ligatures'
        },
        h3: {
          color: DARK_GREY,
          fontSize: '3rem',
          fontVariantLigatures: 'no-common-ligatures'
        },
        h4: {
          color: DARK_GREY,
          fontSize: '2.125rem',
          fontVariantLigatures: 'no-common-ligatures'
        },
        h5: {
          color: DARK_GREY,
          fontSize: '1.5rem',
          fontVariantLigatures: 'no-common-ligatures'
        },
        h6: {
          color: DARK_GREY,
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
        color: BASE_BLUE,
        '&&:hover': {
          backgroundColor: 'transparent'
        }
      },
      colorSecondary: {
        '&$checked': {
          color: BASE_BLUE,
          '&:hover': {
            backgroundColor: 'transparent'
          }
        }
      }
    },
    MuiCircularProgress: {
      colorPrimary: {
        color: WHITE
      }
    },
    MuiInput: {
      input: {
        fontSize: '1rem',
        paddingLeft: '7px',
        paddingRight: '7px'
      }
    },
    MuiTableCell: {
      root: {
        '&:last-child': {
          paddingRight: 25
        }
      }
    }
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  }
});

export const colors = {
  BASE_BLUE: '#1AA1FB',
  DARK_BLUE: '#178DDC',
  LIGHT_BLUE: '#C6E8FE',
  DARKER_GREY: '#262626',
  WHITE: '#FFFFFF'
};
