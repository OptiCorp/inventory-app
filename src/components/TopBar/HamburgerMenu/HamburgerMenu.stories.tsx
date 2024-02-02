import { Meta, StoryObj } from '@storybook/react';
import { HamburgerMenu } from './HamburgerMenu';

const meta = {
    title: 'Components/HamburgerMenu',
    component: HamburgerMenu,
    tags: ['autodocs'],
} as Meta<typeof HamburgerMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        setHamburgerIsOpen: () => {
            console.info('Hamburger menu clicked');
        },
    },
};
