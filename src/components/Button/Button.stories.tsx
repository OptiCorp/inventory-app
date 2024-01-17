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
        backgroundColor: 'black',
        color: 'white',
        children: 'Button',
        height: '40px',
    },
};

export const Secondary: Story = {
    args: {
        backgroundColor: 'white',
        color: 'black',
        children: 'Button',
        height: '40px',
    },
};

export const Danger: Story = {
    args: {
        backgroundColor: 'white',
        color: 'red',
        children: 'Button',
        height: '40px',
    },
};
