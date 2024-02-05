import { Meta, StoryObj } from '@storybook/react';
import SearchInfoCompact from './SearchInfoCompact';

const meta = {
    title: 'Components/SearchInfoCompact',
    component: SearchInfoCompact,
    tags: ['autodocs'],
} as Meta<typeof SearchInfoCompact>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        item: {
            id: '1',
            wpId: 'AWpId: 1870',
            serialNumber: 'AQ11 54C7J',
            location: {
                id: '1',
                name: 'Stavanger',
                userId: '1',
            },
            vendor: {
                id: '1',
                name: 'Equinor',
                address: '1',
                email: 'email@example.com',
                phoneNumber: '123456789',
                addedById: '1',
            },
            itemTemplate: {
                id: '1',
                type: 'Unit',
                description: 'supplanted spoilsmen portress automatists biuniqueness faithfully',
                productNumber: '1129 AB345',
                categoryId: '1',
                category: {
                    id: '1',
                    name: 'Screws',
                    userId: '1',
                },
                name: '',
                createdById: '',
            },
            createdDate: '2023-12-27 10:13:26',
            updatedDate: '2023-12-27 10:13:26',
        },
    },
};
