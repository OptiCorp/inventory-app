import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        variant: 'black',
        children: 'Primary Button',
    },
};

export const Secondary: Story = {
    args: {
        variant: 'white',
        children: 'Secondary Button',
    },
};

export const Danger: Story = {
    args: {
        variant: 'red',
        children: 'Danger Button',
    },
};
