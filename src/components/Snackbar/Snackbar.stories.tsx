import { Meta, StoryObj } from '@storybook/react';
import SnackBar from './Snackbar';

const meta = {
    title: 'Components/Snackbar',
    component: SnackBar,
    tags: ['autodocs'],
} as Meta<typeof SnackBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
