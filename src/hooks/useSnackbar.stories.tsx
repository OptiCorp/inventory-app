import { Meta, StoryObj } from '@storybook/react';
import Snackbar from '../components/Snackbar/Snackbar';

const meta = {
    title: 'Components/Snackbar',
    component: Snackbar,
    tags: ['autodocs'],
} as Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
