import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Source Sans Pro'
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': 'Source Sans Pro'
      }
    }
  }
});

export default theme;