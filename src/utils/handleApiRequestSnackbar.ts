import { AlertColor } from '@mui/material';
import { SetState } from '../pages/partDetails/partInfo/types';

/**
 * Handles the logic for displaying snackbar messages based on API response
 *
 * @param {Response} responseData - The API response data.
 * @param {string} successText - The text to display in the snackbar if the request is successful.
 * @param {string} [updatedElement] - Optional: The element that was updated.
 * @returns {void}
 */
export const handleApiRequestSnackbar = (
    responseData: Response,
    successText: string,
    setSnackbarSeverity: SetState<AlertColor>,
    setSnackbarText: SetState<string>,
    updatedElement?: string
): void => {
    if (responseData.status >= 400 && responseData.status < 500) {
        setSnackbarSeverity('error');
        setSnackbarText(`${responseData.statusText}, please try again.`);
        return;
    } else if (responseData.status >= 500) {
        setSnackbarSeverity('error');
        setSnackbarText(`Something went wrong on our end, refresh page and try again later.`);
        return;
    } else {
        setSnackbarText(`${successText}${updatedElement ? `: ${updatedElement}` : ''}`);
    }
};
