import { Meta, StoryObj } from '@storybook/react';
import SearchBar from './SearchBar';

const meta = {
    title: 'Components/SearchBar',
    component: SearchBar,
    tags: ['autodocs'],
} as Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        setSearchTerm: () => {
            console.info('Search query changed');
        },
        placeholder: 'Search for items',
    },
};

export const Secondary: Story = {
    args: {
        setSearchTerm: () => {
            console.info('Search query changed');
        },
        placeholder: 'Search for items',
        searchTerm: 'Item 1',
    },
};
