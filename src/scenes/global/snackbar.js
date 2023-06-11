import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// Snackbar component
export default function CustomSnackbar  ({ open, message, severity, handleClose })  {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <MuiAlert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};