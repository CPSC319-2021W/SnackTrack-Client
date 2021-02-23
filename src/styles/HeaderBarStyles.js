import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  menu: {
    '& .MuiMenu-paper': {
      maxHeight: '100%',
      top: '70px !important',
      left: '80% !important',
      right: '4rem !important',
      boxShadow: '0px 1px 6px -2px rgba(20,17,43,1)',
      minWidth: '200px'
    },
    '& .MuiButtonBase-root:hover': {
      color: '#5143AA',
      backgroundColor: '#EAE6FF'
    },
    '& .MuiList-padding': { padding: '0' }
  },
  menuItem: {
    color: '#6554C0',
    fontWeight: '600',
    padding: '0.5rem 1rem',
    borderBottom: '1px solid #E4E4E4'
  }
});

export default useStyles;
