import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { StyledDialogCancelButton, StyledDialogSubmitButton } from './styles';

interface DialogProps {
    title: string;
    submitButtonText?: string;
    cancelButtonText?: string;
    SubmitButtonOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    CancelButtonOnClick: () => void;
    open: boolean;

    onClose?: (e: React.MouseEvent) => void;
    children?: React.ReactNode;

    type?: 'submit' | 'reset' | 'button';
    PrimaryType?: 'submit' | 'reset' | 'button';
    form?: string;
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
    PrimaryType,
    form,
}) => {
    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>{title}</DialogTitle>
                {children ? <DialogContent>{children}</DialogContent> : null}
                <DialogActions>
                    <StyledDialogCancelButton onClick={CancelButtonOnClick} type={PrimaryType}>
                        {cancelButtonText ?? 'CANCEL'}
                    </StyledDialogCancelButton>
                    <StyledDialogSubmitButton onClick={SubmitButtonOnClick} type={type} form={form}>
                        {submitButtonText ?? 'CONFIRM'}
                    </StyledDialogSubmitButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CustomDialog;
