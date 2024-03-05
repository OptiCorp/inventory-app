import { Meta, StoryObj } from '@storybook/react';
import { TopBar } from './TopBar';

const meta = {
    title: 'Components/TopBar',
    component: TopBar,
    tags: ['autodocs'],
} as Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
