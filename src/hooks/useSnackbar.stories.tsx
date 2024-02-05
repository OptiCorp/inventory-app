import { Meta, StoryObj } from '@storybook/react';
import { useSnackBar } from '../components/Snackbar/Snackbar';

const meta = {
    title: 'hooks/useSnackbar',
    hook: useSnackBar,
    tags: ['autodocs'],
} as Meta<typeof useSnackBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
