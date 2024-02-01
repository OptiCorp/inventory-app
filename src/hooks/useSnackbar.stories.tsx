import { Meta, StoryObj } from '@storybook/react';
import { useSnackBar } from './useSnackbar';

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
