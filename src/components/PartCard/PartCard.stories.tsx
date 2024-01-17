import { Meta, StoryObj } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import PartCard from './PartCard';

const meta = {
    title: 'Components/PartCard',
    component: PartCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [StoryRouter()],
} as Meta<typeof PartCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        part: {
            id: '1',
            wpId: '1',
            name: 'Part Name',
            serialNumber: '123456',
            productNumber: '123456',
            description: 'Part Description',
            location: {
                id: '1',
                name: 'Location Name',
                userId: '1',
            },
            vendor: {
                id: '1',
                name: 'Vendor Name',
                address: '1',
                email: 'email@example.com',
                phoneNumber: '123456789',
                addedById: '1',
            },
            createdDate: '2021-08-09',
            updatedDate: '2021-08-09',
        },
    },
};
