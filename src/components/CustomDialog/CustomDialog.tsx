import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface DialogProps {
    title: string;
    submitButtonText?: string;
    cancelButtonText?: string;
    SubmitButtonOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    CancelButtonOnClick: () => void;
    open: boolean;
    isWarning?: boolean;
    onClose?: (e: React.MouseEvent) => void;
    children?: React.ReactNode;
    type?: 'submit' | 'reset' | 'button' | undefined;
}

const CustomDialog: React.FC<DialogProps> = ({
    title,
    submitButtonText,
    cancelButtonText,
    SubmitButtonOnClick,
    CancelButtonOnClick,
    open,
    children,
    onClose,
    type,
    isWarning,
}) => {
    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>{title}</DialogTitle>
                {children ? <DialogContent>{children}</DialogContent> : null}
                <DialogActions>
                    <Button
                        variant="text"
                        onClick={CancelButtonOnClick}
                        type={type}
                        sx={{ borderRadius: '0' }}
                    >
                        {cancelButtonText ?? 'CANCEL'}
                    </Button>

                    <Button
                        variant="contained"
                        color={isWarning ? 'error' : 'primary'}
                        onClick={SubmitButtonOnClick}
                        type={type}
                        sx={{ borderRadius: '0' }}
                    >
                        {submitButtonText ?? 'CONFIRM'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CustomDialog;
