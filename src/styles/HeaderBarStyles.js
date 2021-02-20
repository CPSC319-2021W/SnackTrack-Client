import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  menu: {
    '& .MuiMenu-paper': {
      maxHeight: '100%',
      top: '70px !important',
      left: '80% !important',
      right: '3rem !important'
    },
    '& .MuiButtonBase-root:hover': {
      backgroundColor: 'rgb(118, 94, 168, .25)'
    },
    '& .MuiList-padding': { padding: '0' }
  },
  menuItem: {
    color: '#765EA8',
    fontWeight: '600',
    padding: '1rem 4rem',
    borderBottom: '1px solid black'
  }
});

export default useStyles;
