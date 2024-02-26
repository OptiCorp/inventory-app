import { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

const meta = {
    title: 'Components/ProgressBar',
    component: ProgressBar,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
    },
} as Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        activeStep: 4,
    },
};
