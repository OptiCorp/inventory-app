import { Meta, StoryObj } from '@storybook/react';
import { ResponsiveAppBar } from './ResponsiveAppBar';

const meta = {
    title: 'Components/TopBar',
    component: ResponsiveAppBar,
    tags: ['autodocs'],
} as Meta<typeof ResponsiveAppBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
