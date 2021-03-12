import { BASE_BLUE, DARK_BLUE, DARK_GREY, INNER_LIGHT_GREY, LIGHT_GREY, RED, WHITE } from '../styles/Colors.module.css';
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
        fontFamily: 'TT Norms'
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
    MuiOutlinedInput: {
      root: {
        height: '34px',
        margin: 0,
        backgroundColor: INNER_LIGHT_GREY,
        border: `1.5px solid ${LIGHT_GREY}`,
        borderRadius: '4px',
        '&$focused': {
          backgroundColor: WHITE,
          border: `2px solid ${BASE_BLUE}`
        },
        '&$error': {
          border: `2px solid ${RED}`
        }
      },
      adornedEnd: {
        paddingRight: 0
      },
      input: {
        border: 'none',
        padding: '7px'
      },
      notchedOutline: {
        border: 'none'
      }
    },
    MuiPickersCalendarHeader: {
      transitionContainer: {
        fontWeight: 600
      }
    },
    MuiPickersDay: {
      daySelected: {
        backgroundColor: BASE_BLUE,
        fontWeight: 600,
        '&:hover': {
          backgroundColor: DARK_BLUE
        }
      },
      current: {
        color: BASE_BLUE
      }
    }
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  }
});
