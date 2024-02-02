import {
    Button,
    ButtonPropsColorOverrides,
    ButtonPropsVariantOverrides,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';

import { OverridableStringUnion } from '@mui/types';

interface DialogProps {
    title: string;
    submitButtonText?: string;
    cancelButtonText?: string;
    SubmitButtonOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    CancelButtonOnClick: () => void;
    open: boolean;
    cancelButtonColor?: OverridableStringUnion<
        'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
        ButtonPropsColorOverrides
    >;
    submitButtonColor?: OverridableStringUnion<
        'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
        ButtonPropsColorOverrides
    >;
    onClose?: (e: React.MouseEvent) => void;
    children?: React.ReactNode;
    cancelButtonVariant?: OverridableStringUnion<
        'text' | 'outlined' | 'contained',
        ButtonPropsVariantOverrides
    >;
    submitButtonVariant?: OverridableStringUnion<
        'text' | 'outlined' | 'contained',
        ButtonPropsVariantOverrides
    >;
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
    cancelButtonVariant,
    submitButtonVariant,
    cancelButtonColor: cancelButtoncolor,
    submitButtonColor,
    type,
}) => {
    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>{title}</DialogTitle>
                {children ? <DialogContent>{children}</DialogContent> : null}
                <DialogActions>
                    <Button
                        variant={cancelButtonVariant}
                        color={cancelButtoncolor}
                        onClick={CancelButtonOnClick}
                        type={type}
                        sx={{ borderRadius: '0' }}
                    >
                        {cancelButtonText ?? 'CANCEL'}
                    </Button>

                    <Button
                        variant={submitButtonVariant}
                        color={submitButtonColor}
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
