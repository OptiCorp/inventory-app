import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './CustomCard';

const meta = {
    title: 'Components/CustomCard',
    component: Card,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} as Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Title',
        children: 'Children',
    },
};
