import { Meta, StoryObj } from '@storybook/react';
import AddPartUpload from './AddPartUpload';

const meta = {
    title: 'components/AddPartUpload',
    component: AddPartUpload,
    tags: ['autodocs'],
} as Meta<typeof AddPartUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
