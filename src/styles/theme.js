import colors from '../styles/Colors.module.css';
import { createMuiTheme } from '@material-ui/core/styles';

// import TTNorms from '../assets/fonts/TTNorms-Regular.ttf';

// const ttnorms = {
//   fontFamily: 'TT Norms',
//   fontStyle: 'normal',
//   fontWeight: 400,
//   src: `
//     local('TTNorms),
//     local('TTNorms-Regular),
//     url(${TTNorms}) format('ttf')
//   `
// };

const theme = createMuiTheme({
  typography: {
    fontFamily: ['TT Norms', 'sans-serif'].join(',')
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        // '@font-face': [ttnorms],
        body: {
          color: colors.DARK_GREY,
          backgroundColor: '#F4F5FD',
          fontVariantLigatures: 'no-common-ligatures'
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