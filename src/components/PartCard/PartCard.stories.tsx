import { Meta, StoryObj } from '@storybook/react';
import PartCard from './PartCard';

const meta = {
    title: 'Components/PartCard',
    component: PartCard,
    tags: ['autodocs'],
} as Meta<typeof PartCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        part: {
            id: '1',
            wpId: 'AWpId: 1870',
            serialNumber: 'AQ11 54C7J',
            productNumber: '1129 AB345',
            description: 'supplanted spoilsmen portress automatists biuniqueness faithfully',
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
            createdDate: '2023-12-27 10:13:26',
            updatedDate: '2023-12-27 10:13:26',
        },
    },
};
