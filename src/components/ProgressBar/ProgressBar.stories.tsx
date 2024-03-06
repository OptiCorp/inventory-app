import { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';
import { steps } from './Steps';

const meta = {
    title: 'Components/ProgressBar',
    component: ProgressBar,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
    },
    argTypes: {
        activeStep: {},
    },
} as Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        activeStep: 5,
        steps: steps,
    },
    argTypes: {
        steps: {
            fields: [
                'itemTemplate',
                'wpId',
                'serialNumber',
                'vendorId',
                'isBatch',
                'preCheck',
                'documentation',
            ],
        },
    },
};
