import { ItemSchema } from '../../pages/addItem/hooks/itemValidator';

type stepsSchema = keyof ItemSchema;

export const steps: { fields: stepsSchema[]; slug: string }[] = [
    {
        fields: ['isBatch'],
        slug: 'batch',
    },
    {
        fields: ['preCheck'],
        slug: 'checks',
    },
    {
        fields: ['documentation'],
        slug: 'upload',
    },
    {
        fields: ['itemTemplate'],
        slug: 'template',
    },
    {
        fields: ['serialNumber', 'wpId', 'vendorId'],
        slug: 'add-form',
    },
];
