import { it, expect, describe, vi } from 'vitest';
import '@testing-library/jest-dom';
import apiService from '../../../src/services/api';

// TODO: Implement tests for the response of the API service using Mock Service Worker.

vi.mock('../../../src/services/api', () => {
    return {
        default: () => ({
            addItemsToList: vi.fn(),
            removeItemsFromList: vi.fn(),
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

    it('removeItemsFromList sends correct paramters', async () => {
        const listId = '1';
        const itemId = '2';
        const api = apiService();

        await api.removeItemsFromList(listId, itemId);

        expect(api.removeItemsFromList).toHaveBeenCalledWith(listId, itemId);
    });
});
