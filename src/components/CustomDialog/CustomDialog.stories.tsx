import { Meta, StoryObj } from '@storybook/react';
import CustomDialog from './CustomDialog';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { COLORS } from '../../style/GlobalStyles';

const PreviewDialog = ({
    open,
    title,
    isWarning,
    description,
}: {
    open: boolean;
    title: string;
    isWarning: boolean;
    description: string;
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(open);
    const handleClose = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    return (
        <div>
            <Button
                sx={{ backgroundColor: COLORS.black }}
                variant="contained"
                onClick={() => setIsOpen(true)}
            >
                Trigger Dialog
            </Button>
            <CustomDialog
                CancelButtonOnClick={handleClose}
                SubmitButtonOnClick={handleClose}
                open={isOpen}
                submitButtonText="Ok"
                title={title}
                isWarning={isWarning}
            >
                {description}
            </CustomDialog>
        </div>
    );
};

const meta = {
    title: 'Components/CustomDialog',
    component: PreviewDialog,
    tags: ['autodocs'],
} as Meta<typeof PreviewDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        open: false,
        title: 'Dialog',
        isWarning: false,
        description: 'Small description here.',
    },
    argTypes: {
        open: {
            defaultValue: false,
            description: 'Toggle dialog.',
        },
        title: {
            defaultValue: 'Dialog title',
            description: 'The dialog title.',
        },
        isWarning: {
            defaultValue: false,
            description:
                'When set to true, the dialog may have a distinctive appearance to indicate a warning or critical information.',
        },
    },
    render: (args) => {
        return <PreviewDialog {...args} />;
    },
};
