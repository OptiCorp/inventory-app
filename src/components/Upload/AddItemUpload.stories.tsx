import { Meta, StoryObj } from '@storybook/react';
import { AddItemUpload } from './AddItemUpload';

const meta = {
    title: 'components/AddItemUpload',
    component: AddItemUpload,
    tags: ['autodocs'],
} as Meta<typeof AddItemUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
