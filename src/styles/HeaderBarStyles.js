import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  menu: {
    '& .MuiMenu-paper': {
      maxHeight: '100%',
      top: '70px !important',
      left: '80% !important',
      right: '4rem !important',
      boxShadow: '0 .05rem .25rem 0 #e0d8e2'
    },
    '& .MuiButtonBase-root:hover': {
      color: '#523789',
      backgroundColor: 'rgb(118, 94, 168, .25)'
    },
    '& .MuiList-padding': { padding: '0' }
  },
  menuItem: {
    color: '#765EA8',
    fontWeight: '600',
    padding: '0.5rem 1rem',
    borderBottom: '1px solid #E4E4E4'
  }
});

export default useStyles;
