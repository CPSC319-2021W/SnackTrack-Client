import {
  BASE_BLUE,
  BASE_RED,
  DARK_BLUE,
  DARK_GREY,
  HEADER_GREY,
  LIGHT_GREY,
  MID_GREY,
  RED,
  WHITE
} from '../styles/Colors.module.css';

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
        fontFamily: 'TT Norms',
        fontVariantLigatures: 'no-common-ligatures'
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
      },
      colorSecondary: {
        color: BASE_BLUE
      }
    },
    MuiInputBase: {
      input: {
        fontSize: '14px',
        fontWeight: 500,
        color: DARK_GREY
      }
    },
    MuiInput: {
      input: {
        fontSize: '14px',
        fontWeight: 500,
        paddingLeft: '7px',
        paddingRight: '7px'
      }
    },
    MuiOutlinedInput: {
      root: {
        height: '32px',
        margin: 0,
        border: `1.5px solid ${LIGHT_GREY}`,
        borderRadius: '6px',
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
        '& > p': {
          fontWeight: 600
        }
      }
    },
    MuiPickersDay: {
      daySelected: {
        backgroundColor: BASE_BLUE,
        fontWeight: 600,
        '&:hover': {
          backgroundColor: DARK_BLUE
        },
        '& > span': {
          '& > p': {
            fontWeight: 600
          }
        }
      },
      current: {
        color: BASE_BLUE
      }
    },
    MuiDialog: {
      paper: {
        borderRadius: '12px'
      }
    },
    MuiTabs: {
      root: {
        marginBottom: '1rem'
      },
      indicator: {
        height: '4px',
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        '& > span': {
          height: '4px',
          borderRadius: '4px',
          width: '100%',
          maxWidth: '54px',
          backgroundColor: BASE_RED
        }
      }
    },
    MuiTab: {
      root: {
        color: HEADER_GREY,
        fontWeight: 600,
        fontSize: '1rem',
        textTransform: 'none'
      }
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: HEADER_GREY,
        fontWeight: 600
      }
    },
    MuiSwitch: {
      root: {
        height: '25px',
        width: '44px',
        padding: 0
      },
      colorSecondary: {
        '&$checked': {
          color: BASE_BLUE,
          '& + $track': {
            backgroundColor: BASE_BLUE
          }
        }
      },
      switchBase: {
        padding: '2px'
      },
      track: {
        borderRadius: '26px',
        border: LIGHT_GREY,
        backgroundColor: MID_GREY
      }
    },
    MuiPaper: {
      rounded: {
        borderRadius: '12px'
      }
    },
    MuiIconButton: {
      label: {
        width: '20px',
        opacity: 0.75
      }
    },
    PrivateSwitchBase: {
      root: {
        '& > span': {
          opacity: 1
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
