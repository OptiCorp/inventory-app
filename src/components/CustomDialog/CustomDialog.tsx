import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface DialogProps {
    title: string;
    submitButtonText?: string;
    cancelButtonText?: string;
    SubmitButtonOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    CancelButtonOnClick: () => void;
    open: boolean;
    isWarning?: boolean;
    fullWidth?: boolean;
    onClose?: (e: React.MouseEvent) => void;
    children?: React.ReactNode;
}

export const CustomDialog = ({
    title,
    submitButtonText,
    cancelButtonText,
    SubmitButtonOnClick,
    CancelButtonOnClick,
    open,
    children,
    onClose,
    fullWidth,
    isWarning,
}: DialogProps) => {
    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth={fullWidth}>
                <DialogTitle>{title}</DialogTitle>
                {children ? (
                    <DialogContent>
                        <div>{children}</div>
                    </DialogContent>
                ) : null}
                <DialogActions>
                    <Button variant="text" onClick={CancelButtonOnClick} sx={{ borderRadius: '0' }}>
                        {cancelButtonText ?? 'Cancel'}
                    </Button>

                    <Button
                        variant="contained"
                        color={isWarning ? 'error' : 'primary'}
                        onClick={SubmitButtonOnClick}
                        sx={{ borderRadius: '0' }}
                    >
                        {submitButtonText ?? 'Confirm'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
