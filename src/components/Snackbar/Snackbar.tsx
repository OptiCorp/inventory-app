import { Alert, Snackbar as MuiSnackbar, SnackbarProps } from '@mui/material';
import { useContext } from 'react';
import AppContext from '../../contexts/AppContext';

export const Snackbar: React.FC<SnackbarProps> = () => {
    const {
        showSnackbar,
        snackbarText,
        setSnackbarText,
        setShowSnackbar,
        snackbarSeverity,
        setSnackbarSeverity,
    } = useContext(AppContext);

    return (
        <MuiSnackbar
            autoHideDuration={3000}
            onClose={() => {
                setShowSnackbar(false);
                setSnackbarText('');
                setSnackbarSeverity('success');
            }}
            open={showSnackbar}
        >
            <Alert severity={snackbarSeverity}>{snackbarText}</Alert>
        </MuiSnackbar>
    );
};

export default SnackBar;
