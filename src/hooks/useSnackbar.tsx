import { Alert, Snackbar } from '@mui/material';
import { useContext } from 'react';
import AppContext from '../contexts/AppContext';

export const useSnackBar = () => {
    const {
        showSnackbar,
        snackbarText,
        setSnackbarText,
        setShowSnackbar,
        snackbarSeverity,
        setSnackbarSeverity,
    } = useContext(AppContext);

    const snackbar = (
        <Snackbar
            autoHideDuration={3000}
            onClose={() => {
                setShowSnackbar(false);
                setSnackbarText('');
                setSnackbarSeverity('success');
            }}
            open={showSnackbar}
        >
            <Alert severity={snackbarSeverity}>{snackbarText}</Alert>
        </Snackbar>
    );

    return { snackbar };
};
