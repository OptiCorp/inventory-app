import { it, expect, describe, vi } from 'vitest';
import '@testing-library/jest-dom';
import apiService from '../../../src/services/api.ts';

vi.mock('../../../src/services/api.ts', () => {
    return {
        default: () => ({
            addItemsToList: vi.fn(),
        }),
    };
});

describe('API Service', () => {
    it('addItemsToList sends correct parameters', async () => {
        const listId = '1';
        const itemId = '2';
        const addSubItems = false;

        const api = apiService();

        await api.addItemsToList(listId, itemId, addSubItems);

        expect(api.addItemsToList).toHaveBeenCalledWith(listId, itemId, addSubItems);
    });
});
